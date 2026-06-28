import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (play: boolean) => void;
}

export default function LoadingScreen({ onComplete, isAudioPlaying, setIsAudioPlaying }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Elegant incremental loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 1000); // Allow fade animation
          }, 600);
          return 100;
        }
        const step = Math.random() * 15;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Audio ambient synthesizer using Web Audio API
  const startAmbientSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Main Gain Node for smooth fade-in/out
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 3); // Soft volume
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      // Create an elegant major-seventh/ninth chord representing luxury (C - E - G - B - D)
      const freqs = [130.81, 164.81, 196.00, 246.94, 293.66]; // Warm low pad frequencies
      
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        // Sine wave for ultimate soft ambient tone
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Slightly detune for warm analog chorus effect
        osc.detune.setValueAtTime((idx - 2) * 4, ctx.currentTime);
        
        // Custom LFO for slow breathing volume movement
        oscGain.gain.setValueAtTime(0.08, ctx.currentTime);
        
        osc.connect(oscGain);
        oscGain.connect(mainGain);
        osc.start();
        
        oscillatorsRef.current.push(osc);
      });

      setIsAudioPlaying(true);
    } catch (e) {
      console.error("Web Audio failed to start:", e);
    }
  };

  const stopAmbientSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch(e){}
        });
        oscillatorsRef.current = [];
        setIsAudioPlaying(false);
      }, 1500);
    } else {
      setIsAudioPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isAudioPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  // Safe cleanup
  useEffect(() => {
    return () => {
      // Don't stop immediately if the user wants audio to keep playing as they browse the app!
      if (!isAudioPlaying) {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch(e){}
        });
      }
    };
  }, [isAudioPlaying]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-luxury-black z-[99999] flex flex-col items-center justify-between p-12 select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Row */}
          <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase">
              Lucknow, India
            </span>
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 p-3 rounded-full border border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all duration-300 pointer-events-auto clickable"
              title={isAudioPlaying ? "Mute Ambience" : "Unmute Ambience"}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest uppercase hidden md:inline">Ambience On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-widest uppercase hidden md:inline">Ambience Muted</span>
                </>
              )}
            </button>
          </div>

          {/* Central Logo & Progress Block */}
          <div className="text-center flex flex-col items-center max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-5xl font-display font-light tracking-[0.2em] text-gold-gradient uppercase mb-2">
                DLF MyPad
              </h1>
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto mb-3" />
              <p className="text-xs font-mono tracking-[0.4em] text-neutral-400 uppercase">
                Comfort Keeper
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-64 h-[1px] bg-neutral-800 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
            
            <div className="h-6 flex items-center justify-center">
              <span className="text-[11px] font-mono tracking-[0.3em] text-neutral-400">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="text-center max-w-md mx-auto">
            <p className="text-xs italic text-neutral-500 font-serif mb-2">
              "Your Comfort is Our Priority"
            </p>
            <p className="text-[9px] font-mono tracking-[0.2em] text-neutral-600 uppercase">
              Designed by DLF Comfort Keeper Elite
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
