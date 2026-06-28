import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a mobile/touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      id="custom-cursor"
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-luxury-gold pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: isHovered ? 48 : 24,
        height: isHovered ? 48 : 24,
        backgroundColor: isHovered ? "rgba(193, 150, 85, 0.15)" : "transparent",
        boxShadow: isHovered 
          ? "0 0 20px rgba(193, 150, 85, 0.4)" 
          : "0 0 10px rgba(193, 150, 85, 0.1)",
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
    >
      <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
    </motion.div>
  );
}
