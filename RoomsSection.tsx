import { motion } from "motion/react";
import { Bed, Users, Expand, ShieldCheck, Star } from "lucide-react";
import { Room } from "../types";

// Import our custom-generated high-quality visual paths
import studioImg from "../assets/images/studio_apartment_1782657950266.jpg";
import workspaceImg from "../assets/images/executive_workspace_1782657964745.jpg";
import bathImg from "../assets/images/luxury_bathroom_1782657979840.jpg";

interface RoomsSectionProps {
  onBookClick: (roomName?: string) => void;
}

export default function RoomsSection({ onBookClick }: RoomsSectionProps) {
  const rooms: Room[] = [
    {
      id: "rm-1",
      name: "Luxury Studio Suite",
      tagline: "Unmatched Private Elegance",
      description: "Crafted with soft velvet emerald furnishings, custom champagne gold accents, and a smart home ecosystem for the ultimate private stay.",
      image: studioImg,
      size: "450 sq ft",
      occupancy: "2 Adults",
      price: "₹4,500",
      features: ["King Bed", "Smart TV & Entertainment", "In-Room Butler Support", "Emerald Lounge Area"]
    },
    {
      id: "rm-2",
      name: "Executive Workspace Suite",
      tagline: "Corporate Luxury & Serenity",
      description: "Designed for modern leaders. Features a premium executive leather workspace, private library lounge, and high-performance fiber internet.",
      image: workspaceImg,
      size: "550 sq ft",
      occupancy: "2 Adults + 1 Child",
      price: "₹6,000",
      features: ["Premium Workdesk", "Full Kitchenette", "Coffee Station", "24/7 Concierge Link"]
    },
    {
      id: "rm-3",
      name: "Royal Bath Penthouse Suite",
      tagline: "The Zenith of Relaxation",
      description: "An absolute masterwork of design. Features deep emerald marble spa bathtubs, private steam columns, and a panoramic Gomti Nagar balcony view.",
      image: bathImg,
      size: "680 sq ft",
      occupancy: "2 Adults + 2 Children",
      price: "₹7,500",
      features: ["Freestanding Marble Tub", "Private Balcony Oasis", "Walk-in Dressing Wardrobe", "Smart Climate Zones"]
    }
  ];

  return (
    <section id="rooms" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-luxury-emerald/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-luxury-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center md:text-left md:flex justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
              Bespoke Residencies
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-wide text-white uppercase mb-4">
              Luxury Suite Collection
            </h2>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed">
              Every studio and suite is meticulously appointed with matte black walls, emerald velvet textures, gold metal craftwork, and smart appliances tailored for unmatched style.
            </p>
          </div>
          <div className="hidden md:flex gap-2 items-center text-xs font-mono text-neutral-500 uppercase">
            <Star className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
            <span>Select comfort suited for you</span>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col rounded-3xl overflow-hidden glass-card border border-neutral-900/80 hover:border-luxury-gold/40 hover:gold-glow transition-all duration-500 bg-neutral-950/40"
            >
              {/* Premium Image Block with Zoom & Gold Sweep overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Visual Glass Tint Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-luxury-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color-burn" />

                {/* Corner Size Label */}
                <div className="absolute top-4 right-4 bg-luxury-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800/80 flex items-center gap-1.5 z-10">
                  <Expand className="w-3 h-3 text-luxury-gold" />
                  <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">{room.size}</span>
                </div>

                {/* Hover luxury reflection line sweep */}
                <div className="absolute -inset-x-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-pulse pointer-events-none" />
              </div>

              {/* Suite Content Details */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-luxury-gold uppercase">
                      {room.tagline}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                      <Users className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{room.occupancy}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-light text-white tracking-wide uppercase mb-3 group-hover:text-gold-gradient transition-colors duration-300">
                    {room.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                    {room.description}
                  </p>

                  {/* Feature Lists */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-neutral-900/60 pt-5 mb-8">
                    {room.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                        <span className="text-[10px] text-neutral-400 font-sans tracking-wide leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Pricing & Call-to-Action */}
                <div className="flex items-center justify-between border-t border-neutral-900/80 pt-5 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">bespoke rates</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-display font-medium text-luxury-gold">{room.price}</span>
                      <span className="text-[9px] font-mono text-neutral-500 lowercase">/ night</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookClick(room.name)}
                    className="text-[10px] font-mono tracking-[0.2em] text-neutral-300 hover:text-luxury-black border border-neutral-800 px-5 py-2.5 rounded-full hover:bg-luxury-gold hover:border-luxury-gold transition-all duration-300 active:scale-95 clickable"
                  >
                    SELECT STAY
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
