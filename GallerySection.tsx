import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { GalleryItem } from "../types";

// Import our beautifully generated images
import heroImg from "../assets/images/hero_luxury_suite_1782657932413.jpg";
import studioImg from "../assets/images/studio_apartment_1782657950266.jpg";
import workspaceImg from "../assets/images/executive_workspace_1782657964745.jpg";
import bathImg from "../assets/images/luxury_bathroom_1782657979840.jpg";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      url: heroImg,
      title: "Royal Penthouse Suite Skyline View",
      category: "Suite"
    },
    {
      id: "gal-2",
      url: studioImg,
      title: "Luxury Studio Suite Emerald Master Bed",
      category: "Suite"
    },
    {
      id: "gal-3",
      url: workspaceImg,
      title: "Executive Desk & Lounge",
      category: "Lounge"
    },
    {
      id: "gal-4",
      url: bathImg,
      title: "Emerald Marble Soaking Spa Bath",
      category: "Spa"
    },
    {
      id: "gal-5",
      url: heroImg,
      title: "Panoramic Floor-to-Ceiling Living Vista",
      category: "Lounge"
    },
    {
      id: "gal-6",
      url: studioImg,
      title: "Bespoke Silk Bedding Details",
      category: "Detail"
    }
  ];

  const filteredItems = activeFilter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const categories = ["All", "Suite", "Lounge", "Spa", "Detail"];

  const openLightbox = (id: string) => {
    const idx = galleryItems.findIndex(item => item.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="md:flex justify-between items-end mb-16 gap-8 text-center md:text-left">
          <div>
            <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
              Visual Narrative
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-wide text-white uppercase">
              The Luxury Gallery
            </h2>
          </div>

          {/* Filter Pill List */}
          <div className="flex flex-wrap gap-2 justify-center mt-6 md:mt-0 border border-neutral-900 bg-neutral-950/40 p-1.5 rounded-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-300 clickable ${
                  activeFilter === cat
                    ? "bg-luxury-gold text-luxury-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-neutral-900 hover:border-luxury-gold/30 hover:scale-[1.01] transition-all duration-500 cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Shimmer Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Details Floating */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-luxury-gold uppercase block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-display tracking-widest text-neutral-200 uppercase font-light">
                      {item.title}
                    </h4>
                  </div>

                  <div className="p-2.5 rounded-full bg-luxury-gold text-luxury-black shadow-md hover:scale-110 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[9999] bg-luxury-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 md:p-12 select-none"
          >
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-neutral-400 z-10">
              <span className="text-[10px] font-mono tracking-widest uppercase text-luxury-gold">
                {galleryItems[lightboxIndex].category} • {lightboxIndex + 1} of {galleryItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-3 bg-neutral-900 rounded-full text-neutral-300 hover:text-luxury-gold hover:scale-105 transition-all duration-300 clickable"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Stage */}
            <div className="relative max-w-5xl w-full aspect-[16/10] max-h-[75vh] flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:-left-16 p-4 bg-neutral-900/60 hover:bg-neutral-900 backdrop-blur-md rounded-full text-neutral-300 hover:text-luxury-gold hover:scale-105 transition-all duration-300 z-10 clickable"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={galleryItems[lightboxIndex].url}
                alt={galleryItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 md:-right-16 p-4 bg-neutral-900/60 hover:bg-neutral-900 backdrop-blur-md rounded-full text-neutral-300 hover:text-luxury-gold hover:scale-105 transition-all duration-300 z-10 clickable"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Captions */}
            <div className="absolute bottom-6 text-center max-w-xl px-6">
              <h3 className="text-base font-display font-light text-white tracking-widest uppercase mb-1">
                {galleryItems[lightboxIndex].title}
              </h3>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">
                DLF MYPAD COMFORT KEEPER • LUCKNOW
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
