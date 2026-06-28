import React, { useState, useEffect } from "react";
import { Menu, X, Phone, CalendarRange } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onBookClick: () => void;
  onChatClick: () => void;
}

export default function Navbar({ onBookClick, onChatClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Rooms", href: "#rooms" },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "glass-nav py-3 shadow-lg" 
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand Block */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex flex-col select-none group"
          >
            <span className="text-xl md:text-2xl font-display font-light tracking-[0.25em] text-gold-gradient group-hover:opacity-95 transition-opacity">
              DLF MYPAD
            </span>
            <span className="text-[9px] font-mono tracking-[0.4em] text-neutral-400 group-hover:text-luxury-gold transition-colors duration-300">
              COMFORT KEEPER
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-xs tracking-widest text-neutral-400 hover:text-luxury-gold uppercase transition-colors duration-300 py-1 font-mono group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+918090871133"
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-luxury-gold border border-neutral-800/80 bg-neutral-950/20 px-4 py-2.5 rounded-full hover:border-luxury-gold/50 transition-all duration-300 clickable"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 8090871133</span>
            </a>
            
            <button
              onClick={onBookClick}
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-luxury-black bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-dark px-6 py-2.5 rounded-full font-medium hover:brightness-110 shadow-md transition-all duration-300 hover:scale-[1.02] clickable"
            >
              <CalendarRange className="w-3.5 h-3.5" />
              <span>BOOK NOW</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onBookClick}
              className="p-2.5 bg-luxury-gold text-luxury-black rounded-full shadow-md hover:scale-105 transition-transform md:hidden clickable"
              title="Book Stay"
            >
              <CalendarRange className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-luxury-gold transition-all duration-300 clickable"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 top-[70px] z-40 bg-luxury-black/95 backdrop-blur-xl border-t border-neutral-900/50 flex flex-col p-8 md:p-12 justify-between lg:hidden"
          >
            {/* Nav List */}
            <div className="flex flex-col gap-6 mt-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-2xl font-display font-light text-neutral-300 hover:text-luxury-gold transition-colors tracking-wide"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Bottom Panel */}
            <div className="flex flex-col gap-4 border-t border-neutral-900/80 pt-8">
              <a 
                href="tel:+918090871133"
                className="flex items-center justify-center gap-3 text-sm font-mono tracking-widest text-neutral-400 hover:text-luxury-gold border border-neutral-800 bg-neutral-950/40 py-4 rounded-xl"
              >
                <Phone className="w-4 h-4" />
                <span>+91 8090871133</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="flex items-center justify-center gap-3 text-sm font-mono tracking-widest text-luxury-black bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-dark py-4 rounded-xl font-medium"
              >
                <CalendarRange className="w-4 h-4" />
                <span>BOOK BESPOKE STAY</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onChatClick();
                }}
                className="text-center text-xs font-mono text-neutral-500 hover:text-luxury-gold transition-colors mt-2"
              >
                Talk to Aditya (AI Concierge)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
