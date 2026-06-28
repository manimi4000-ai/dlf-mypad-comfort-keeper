import { motion } from "motion/react";
import { Star, ShieldAlert, Award, Compass } from "lucide-react";
import heroImg from "../assets/images/hero_luxury_suite_1782657932413.jpg";
import studioImg from "../assets/images/studio_apartment_1782657950266.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-luxury-dark relative overflow-hidden">
      {/* Visual background ambient details */}
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-luxury-emerald/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-luxury-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Block - Narrative & Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
              Bespoke Storytelling
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-wide text-white uppercase mb-6 leading-tight">
              A Private Sanctuary <br />
              <span className="text-gold-gradient">In Lucknow's Heart</span>
            </h2>
            
            <p className="text-sm text-neutral-300 font-sans leading-relaxed mb-6">
              Situated in the prestigious Vibhuti Khand, Gomti Nagar, DLF MyPad Comfort Keeper is not merely a residence—it is a bespoke hospitality destination where contemporary high-end luxury seamlessly blends with unmatched physical comfort.
            </p>
            
            <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-10">
              Each studio apartment has been crafted around the ideals of spacious breathing room and cinematic design. From custom-scented ambient aromatherapy to advanced smart-home integrations, we orchestrate every single detail to ensure that your comfort is not just achieved—it is treated as our absolute priority.
            </p>

            {/* Core Brand Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral-900 pt-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-luxury-emerald/20 border border-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-medium text-white tracking-widest uppercase mb-1">
                    Prime Location
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Centrally positioned in Lucknow's most elite corporate and leisure hub.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-luxury-emerald/20 border border-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-display font-medium text-white tracking-widest uppercase mb-1">
                    Bespoke Craft
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Designed by top agencies using emerald velvet, gold leaf, and matte black tones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Parallax Images Block */}
          <div className="lg:col-span-5 relative h-[450px] md:h-[550px] w-full flex items-center justify-center lg:justify-end">
            {/* Primary Background Floating Frame */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-10/12 aspect-[3/4] rounded-3xl overflow-hidden glass-card border border-neutral-800 relative shadow-2xl z-10"
            >
              <img
                src={heroImg}
                alt="Living suite overview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
            </motion.div>

            {/* Overlapping Secondary Card with interactive floating motion */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: -30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 left-0 md:left-6 w-1/2 aspect-[1/1] rounded-2xl overflow-hidden glass-card border border-luxury-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 hover:scale-105 hover:border-luxury-gold/50 transition-all duration-500 hidden md:block"
            >
              <img
                src={studioImg}
                alt="Cozy suite bed detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 to-transparent" />
              
              {/* Overlaid stat stamp */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase block">Rating</span>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 text-luxury-gold fill-luxury-gold" />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-neutral-400 block mt-1 uppercase">Comfort Standard</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
