import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Create Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background to show parent CSS gradient mesh
    scene.fog = new THREE.FogExp2(0x042a1f, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const goldLight = new THREE.DirectionalLight(0xc19655, 3.0);
    goldLight.position.set(5, 5, 5);
    goldLight.castShadow = true;
    scene.add(goldLight);

    const emeraldLight = new THREE.PointLight(0x059669, 3.5, 30);
    emeraldLight.position.set(-5, -3, 2);
    scene.add(emeraldLight);

    // Central Glass Mesh Block representing high-end DLF residence
    const cubeGeo = new THREE.BoxGeometry(3, 3, 3);
    const cubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xc19655,
      metalness: 0.15,
      roughness: 0.05,
      transmission: 0.9, // glass refraction
      ior: 1.5,
      thickness: 1.2,
      specularIntensity: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const mainGlassCube = new THREE.Mesh(cubeGeo, cubeMat);
    mainGlassCube.castShadow = true;
    mainGlassCube.receiveShadow = true;
    scene.add(mainGlassCube);

    // Floating 3D "Gold Ring / Torus"
    const torusGeo = new THREE.TorusGeometry(2, 0.12, 16, 100);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc19655,
      metalness: 0.95,
      roughness: 0.1,
    });
    const luxuryRing = new THREE.Mesh(torusGeo, goldMat);
    luxuryRing.rotation.x = Math.PI / 2;
    scene.add(luxuryRing);

    // Floating Gold Dust / Particles
    const particlesCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14; // z
      speeds[i] = Math.random() * 0.015 + 0.004;
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    // Custom soft gold particle material
    const particleMat = new THREE.PointsMaterial({
      color: 0xe8d7b7,
      size: 0.075,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeo, particleMat);
    scene.add(particles);

    // Interaction Coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        const w = newWidth || 300;
        const h = newHeight || 450;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow elegant rotations
      mainGlassCube.rotation.x = elapsedTime * 0.12;
      mainGlassCube.rotation.y = elapsedTime * 0.18;
      
      luxuryRing.rotation.y = elapsedTime * 0.08;
      luxuryRing.rotation.x = Math.PI / 2.3 + Math.sin(elapsedTime * 0.25) * 0.08;

      // Mouse Parallax interpolation
      targetX = mouseX * 2.2;
      targetY = mouseY * 2.2;

      // Smooth camera orbit
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Animate floating particles upward
      const posArr = particlesGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        posArr[i * 3 + 1] += speeds[i]; // move Y up
        if (posArr[i * 3 + 1] > 7) {
          posArr[i * 3 + 1] = -7; // wrap around bottom
        }
        posArr[i * 3] += Math.sin(elapsedTime * 0.8 + i) * 0.0015; // smooth breeze sway
      }
      particlesGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      try {
        cubeGeo.dispose();
        cubeMat.dispose();
        torusGeo.dispose();
        goldMat.dispose();
        particlesGeo.dispose();
        particleMat.dispose();
        renderer.dispose();
      } catch (e) {}
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[480px] flex items-center justify-center rounded-3xl overflow-hidden glass-card border border-luxury-gold/15 shadow-2xl group cursor-grab active:cursor-grabbing">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Decorative Text Labels Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none z-10 flex flex-col gap-1">
        <span className="text-[10px] font-mono tracking-[0.3em] text-luxury-gold uppercase">
          Tactile Interactive Canvas
        </span>
        <h3 className="text-xs font-display tracking-widest text-neutral-300 font-light uppercase">
          Interactive 3D Glass Portal
        </h3>
      </div>

      <div className="absolute bottom-6 right-6 pointer-events-none z-10 text-right">
        <p className="text-[10px] font-mono tracking-[0.2em] text-neutral-400">
          ROTATE • HOVER • SWIPE
        </p>
        <p className="text-[8px] font-mono text-neutral-500">
          GLS-M 1.5 ior Refract
        </p>
      </div>

      {/* Luxury Golden Ambient Glow Circles */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-luxury-gold/5 rounded-full filter blur-3xl pointer-events-none transition-transform duration-1000 group-hover:scale-125" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-luxury-emerald/15 rounded-full filter blur-3xl pointer-events-none transition-transform duration-1000 group-hover:scale-125" />
    </div>
  );
}
