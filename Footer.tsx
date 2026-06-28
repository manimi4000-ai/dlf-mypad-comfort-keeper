import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-black py-16 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Logo Brand Frame */}
          <div className="md:col-span-5 flex flex-col">
            <span className="text-2xl font-display font-light tracking-[0.25em] text-gold-gradient uppercase mb-1">
              DLF MYPAD
            </span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-neutral-500 uppercase mb-4">
              Comfort Keeper
            </span>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm mb-6">
              Experience the pinnacle of hospitality. Premium luxury studio residencies where comfort remains our absolute, unwavering priority.
            </p>

            {/* Social Icons row */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Linkedin, href: "https://linkedin.com" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-luxury-gold hover:border-luxury-gold flex items-center justify-center transition-all duration-300 clickable"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase mb-6">
              Explore Spaces
            </h4>
            <div className="flex flex-col gap-3 text-xs text-neutral-400">
              <a href="#home" className="hover:text-white transition-colors">Bespoke Sanctuary</a>
              <a href="#rooms" className="hover:text-white transition-colors">Luxury Suite Collection</a>
              <a href="#amenities" className="hover:text-white transition-colors">Elite Curated Amenities</a>
              <a href="#gallery" className="hover:text-white transition-colors">Visual Gallery Story</a>
            </div>
          </div>

          {/* Location / Reservation Column */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-[10px] font-mono tracking-widest text-luxury-gold uppercase mb-6">
              Liaison Offices
            </h4>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-2">
              Vibhuti Khand, Gomti Nagar,<br />
              Lucknow, Uttar Pradesh, India
            </p>
            <p className="text-xs text-neutral-400 font-mono">
              Direct Desk: +91 8090871133
            </p>
            <p className="text-xs text-neutral-400 font-mono">
              Liaison: stay@dlfmypadcomfort.com
            </p>
          </div>

        </div>

        {/* Divider and Copyright bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center sm:text-left">
            <span>© {currentYear} DLF MYPAD COMFORT KEEPER.</span>
            <div className="flex gap-4">
              <a href="#booking" className="hover:text-luxury-gold transition-colors">Privacy Statement</a>
              <span>•</span>
              <a href="#booking" className="hover:text-luxury-gold transition-colors">Terms of Hospitality</a>
            </div>
          </div>

          {/* Scroll back to top bubble */}
          <button
            onClick={handleScrollToTop}
            className="p-3 bg-neutral-900 border border-neutral-800 hover:border-luxury-gold text-neutral-400 hover:text-luxury-gold rounded-full shadow hover:scale-105 transition-all cursor-pointer clickable"
            title="Scroll to Pinnacle"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
