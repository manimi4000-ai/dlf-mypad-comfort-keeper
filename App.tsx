import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarRange, Phone, MessageSquare, ArrowDown, Sparkles } from "lucide-react";

// Import modular components
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ThreeDExperience from "./components/ThreeDExperience";
import RoomsSection from "./components/RoomsSection";
import AmenitiesSection from "./components/AmenitiesSection";
import GallerySection from "./components/GallerySection";
import AboutSection from "./components/AboutSection";
import AIConcierge from "./components/AIConcierge";
import Testimonials from "./components/Testimonials";
import BookingForm from "./components/BookingForm";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// Import the high-quality generated hero suite image
import heroSuiteImg from "./assets/images/hero_luxury_suite_1782657932413.jpg";

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [selectedRoomCategory, setSelectedRoomCategory] = useState<string | undefined>(undefined);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Smooth scroll handler to booking form
  const handleBookNowScroll = (roomCategory?: string) => {
    if (roomCategory) {
      setSelectedRoomCategory(roomCategory);
    }
    const target = document.querySelector("#booking");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Chat toggle handler to trigger conversation
  const handleChatTrigger = () => {
    const chatBubble = document.getElementById("ai-butler-bubble");
    if (chatBubble) {
      chatBubble.click();
    }
  };

  return (
    <>
      {/* 1. Custom Magnetic Luxury Cursor */}
      <CustomCursor />

      {/* 2. Cinematic Loading & Welcome Stage with Sound System */}
      <LoadingScreen 
        onComplete={() => setIsLoadingComplete(true)} 
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
      />

      <AnimatePresence>
        {isLoadingComplete && (
          <motion.div
            id="app-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-luxury-black text-neutral-100 min-h-screen relative font-sans"
          >
            {/* Ambient Noise overlay for cinematic luxury texture */}
            <div className="fixed inset-0 bg-noise pointer-events-none z-30" />

            {/* 3. Floating AI Butler Concierge Aditya */}
            <AIConcierge />

            {/* 4. Elegant Glassmorphic Navbar */}
            <Navbar 
              onBookClick={() => handleBookNowScroll()} 
              onChatClick={handleChatTrigger}
            />

            {/* 5. HERO SECTION: Fullscreen Cinematic Entry */}
            <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
              {/* Parallax Hero Image background */}
              <div className="absolute inset-0 z-0">
                <img
                  src={heroSuiteImg}
                  alt="DLF MyPad Luxury Suite interior preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] brightness-[0.3] scale-105 transition-transform duration-1000"
                />
                
                {/* Custom Gradient Mesh Overlay representing Emerald / Matte Black Theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent" />
                <div className="absolute inset-0 bg-radial-gradient(at center, rgba(4, 42, 31, 0.3) 0%, transparent 70%)" />
              </div>

              {/* Central Copy & Actions Layout */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center text-center mt-8">
                
                {/* Golden spark micro-pill */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-emerald/20 backdrop-blur-md mb-8 shadow-lg select-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                  <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">
                    Your Comfort is Our Priority
                  </span>
                </motion.div>

                {/* Main Heading Display Typography */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-8xl font-display font-light tracking-wide text-white uppercase leading-[1.05] mb-6 select-none"
                >
                  Luxury Living.<br />
                  <span className="text-gold-gradient font-normal">Premium Comfort.</span>
                </motion.h1>

                {/* Subheading Narrative */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="text-sm sm:text-lg text-neutral-300 font-sans tracking-wide max-w-2xl mb-12 leading-relaxed"
                >
                  Experience premium boutique hospitality designed for unforgettable corporate and leisure stays in Vibhuti Khand, Gomti Nagar, Lucknow.
                </motion.p>

                {/* Luxury Action Row */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
                >
                  <button
                    onClick={() => handleBookNowScroll()}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-dark text-luxury-black font-mono font-semibold tracking-widest text-xs hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-[0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer clickable"
                  >
                    BOOK YOUR STAY
                  </button>

                  <a
                    href="https://wa.me/918090871133"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-4 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-neutral-300 hover:text-luxury-gold hover:border-luxury-gold/50 font-mono tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 clickable"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WHATSAPP US</span>
                  </a>

                  <a
                    href="tel:+918090871133"
                    className="w-full sm:w-auto px-6 py-4 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-neutral-300 hover:text-luxury-gold hover:border-luxury-gold/50 font-mono tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 clickable"
                  >
                    <Phone className="w-4 h-4 text-luxury-gold" />
                    <span>CALL DIRECT</span>
                  </a>
                </motion.div>

                {/* Subtle Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6, y: [0, 8, 0] }}
                  transition={{ delay: 1.4, duration: 2, repeat: Infinity }}
                  className="absolute bottom-12 flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase select-none pointer-events-none"
                >
                  <span>SCROLL TO EXPLORE</span>
                  <ArrowDown className="w-3 h-3 text-luxury-gold" />
                </motion.div>
              </div>

              {/* Golden Cinematic Sweep Overlays */}
              <div className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-b from-luxury-black to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-luxury-black to-transparent" />
            </header>

            {/* 6. ADVANCED 3D EXPERIMENTAL VIEWPORT: Centered as bento box of the day */}
            <section className="py-12 bg-luxury-black relative z-10 max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 max-w-md">
                  <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
                    Interactive Spline Mesh
                  </span>
                  <h2 className="text-2xl md:text-4xl font-display font-light text-white tracking-wide uppercase mb-4">
                    The 3D Refraction Portal
                  </h2>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                    Orchestrated on a WebGL framework utilizing custom physical-glass indices, mouse coordinates determine kinetic camera angles. Swipe, stretch, and hover the refraction block to observe physics-based luxury.
                  </p>
                  <button
                    onClick={() => handleBookNowScroll()}
                    className="text-[10px] font-mono tracking-widest text-luxury-gold hover:text-white border-b border-luxury-gold py-1 uppercase transition-colors clickable"
                  >
                    Secure Your Suite Today →
                  </button>
                </div>
                <div className="lg:col-span-8 w-full">
                  <ThreeDExperience />
                </div>
              </div>
            </section>

            {/* 7. Room Showcase section with high-contrast card tilt */}
            <RoomsSection onBookClick={handleBookNowScroll} />

            {/* 8. Curated Amenities bento-grid */}
            <AmenitiesSection />

            {/* 9. Visual Masonry Photo Gallery */}
            <GallerySection />

            {/* 10. Brand Narrative Storytelling */}
            <AboutSection />

            {/* 11. Guest Reviews & Testimonials slider */}
            <Testimonials />

            {/* 12. secure escrow Reservation Form */}
            <BookingForm preselectedRoom={selectedRoomCategory} />

            {/* 13. Direct communications & Pinpoint Maps */}
            <ContactSection />

            {/* 14. Luxury minimal footer */}
            <Footer />

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
