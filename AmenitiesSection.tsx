import { motion } from "motion/react";
import { 
  Wifi, Tv, Wind, BedDouble, Car, Headphones, 
  Sparkles, Shield, ChefHat, Briefcase, Zap, KeyRound 
} from "lucide-react";
import { Amenity } from "../types";

export default function AmenitiesSection() {
  const amenities: (Amenity & { iconComponent: any })[] = [
    {
      icon: "Wifi",
      iconComponent: Wifi,
      title: "High-Speed Fiber WiFi",
      description: "Dedicated optical fiber connection for seamless 4K streaming and high-capacity digital nomad workflow."
    },
    {
      icon: "Tv",
      iconComponent: Tv,
      title: "Smart TV Ecosystem",
      description: "4K ultra-wide Smart LED screen with complete streaming access, synced premium audio, and device mirroring."
    },
    {
      icon: "Wind",
      iconComponent: Wind,
      title: "Curated Climate Control",
      description: "Whisper-quiet split air-conditioning with multi-zone filters to keep your space perfectly fresh."
    },
    {
      icon: "BedDouble",
      iconComponent: BedDouble,
      title: "Elite Comfort Bedding",
      description: "Premium high-thread orthopaedic memory foam mattresses paired with rich egyptian cotton sheets."
    },
    {
      icon: "Car",
      iconComponent: Car,
      title: "Valet & Secured Parking",
      description: "Ample, camera-monitored reserved garage spaces in Gomti Nagar for safe, convenient vehicle hosting."
    },
    {
      icon: "Headphones",
      iconComponent: Headphones,
      title: "24x7 Personal Assistant",
      description: "Direct elite helpline access to Aditya, your digital butler, ready to coordinate laundry or orders instantly."
    },
    {
      icon: "Sparkles",
      iconComponent: Sparkles,
      title: "Daily Turndown Service",
      description: "Surgical grade housekeeping, meticulous sterilization, room scent adjustments, and towel refreshes."
    },
    {
      icon: "Shield",
      iconComponent: Shield,
      title: "Elite Multi-Tier Security",
      description: "Camera-guarded gated perimeter, electronic visual interlocks, and secure keycard digital locks."
    },
    {
      icon: "ChefHat",
      iconComponent: ChefHat,
      title: "Gourmet Kitchen Space",
      description: "Equipped studio induction kitchen, microwave oven, premium tableware, and private mini-bar setup."
    },
    {
      icon: "Briefcase",
      iconComponent: Briefcase,
      title: "Ergonomic Workspace",
      description: "Professional leather-bound executive desk, reading luminaires, and electrical charging panels."
    },
    {
      icon: "Zap",
      iconComponent: Zap,
      title: "Uninterrupted Power",
      description: "Dedicated power backup systems ensuring zero blackout times or utility pauses for your work."
    },
    {
      icon: "KeyRound",
      iconComponent: KeyRound,
      title: "Smart Door Interlock",
      description: "Instant remote smartphone access and customizable pincodes for state-of-the-art keyless entry."
    }
  ];

  return (
    <section id="amenities" className="py-24 bg-luxury-dark relative overflow-hidden">
      {/* Visual Ambient Grid Backing */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-emerald/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
            Exceptional Living
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light tracking-wide text-white uppercase mb-4">
            Curated Amenities
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold mx-auto mb-4" />
          <p className="text-sm text-neutral-400 font-sans leading-relaxed">
            Every feature at DLF MyPad Comfort Keeper is engineered to establish a sense of elite luxury, modern ease, and profound relaxation.
          </p>
        </div>

        {/* Bento Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.iconComponent;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}
                className="group p-6 rounded-2xl glass-card border border-neutral-900 hover:border-luxury-gold/25 hover:gold-glow transition-all duration-500 bg-neutral-950/25 flex flex-col justify-between"
              >
                <div>
                  {/* Glowing Animated Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-luxury-emerald/20 border border-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-5 group-hover:scale-110 group-hover:bg-luxury-emerald/40 transition-all duration-300 relative">
                    <Icon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                    {/* Tiny visual pulse circle */}
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-luxury-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h3 className="text-sm font-display font-medium text-white tracking-widest uppercase mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Micro-Indicator Line */}
                <div className="h-[1px] w-0 bg-gradient-to-r from-luxury-gold-dark to-luxury-gold mt-6 transition-all duration-500 group-hover:w-1/3" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
