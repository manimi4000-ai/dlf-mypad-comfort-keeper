import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews: Testimonial[] = [
    {
      id: "t-1",
      name: "Rohit Singhania",
      role: "Managing Director, Singhania Venture Group",
      rating: 5,
      quote: "Absolute masterpiece. The custom matte black interior combined with emerald plush furniture feels incredibly luxurious. Aditya, the virtual butler, accommodated my late check-in with absolute ease.",
      date: "June 2026"
    },
    {
      id: "t-2",
      name: "Dr. Ananya Roy",
      role: "Senior Consultant, Max Healthcare",
      rating: 5,
      quote: "Vibhuti Khand's best-kept secret. DLF MyPad Comfort Keeper provides an executive workspace that was perfect for my preparation. Impeccably quiet, blazing WiFi, and majestic champagne gold details.",
      date: "May 2026"
    },
    {
      id: "t-3",
      name: "Vikram Malhotra",
      role: "Tech Lead & Digital Nomad",
      rating: 5,
      quote: "It felt like a custom-designed luxury apartment in Manhattan or London. The attention to detail is stunning. Smart TV, continuous power backup, and a pristine marble bath. Highly recommended.",
      date: "April 2026"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 8000); // 8 seconds per slide for a calm pace
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-24 bg-luxury-dark relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-luxury-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Section Header */}
        <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
          Distinguished Guests
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-light tracking-wide text-white uppercase mb-16">
          Guest Testimonials
        </h2>

        {/* Carousel Container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-12 rounded-3xl glass-card border border-luxury-gold/15 bg-neutral-950/25 max-w-3xl w-full mx-auto relative shadow-2xl"
            >
              <Quote className="w-12 h-12 text-luxury-gold/15 absolute top-6 left-6" />

              {/* Stars Row */}
              <div className="flex gap-1 justify-center mb-6">
                {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-luxury-gold fill-luxury-gold" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-sm md:text-lg text-neutral-200 font-serif leading-relaxed italic mb-8 px-4 md:px-8">
                "{reviews[activeIndex].quote}"
              </p>

              {/* Author Info */}
              <div className="border-t border-neutral-900 pt-6 max-w-xs mx-auto">
                <h4 className="text-sm font-display font-medium text-white tracking-widest uppercase">
                  {reviews[activeIndex].name}
                </h4>
                <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  {reviews[activeIndex].role}
                </p>
                <span className="text-[9px] font-mono text-neutral-500 block mt-2 uppercase tracking-widest">
                  Stayed: {reviews[activeIndex].date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-16 p-3 rounded-full border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-luxury-gold hover:border-luxury-gold transition-all duration-300 cursor-pointer clickable"
            title="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-16 p-3 rounded-full border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-luxury-gold hover:border-luxury-gold transition-all duration-300 cursor-pointer clickable"
            title="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="flex gap-2 justify-center mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 clickable ${
                idx === activeIndex ? "w-6 bg-luxury-gold" : "w-1.5 bg-neutral-800 hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
