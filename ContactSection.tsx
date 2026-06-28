import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const contacts = [
    {
      icon: Phone,
      title: "Telephonic Helpline",
      value: "+91 8090871133",
      actionLabel: "CALL DIRECTLY",
      href: "tel:+918090871133"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Concierge",
      value: "+91 8090871133",
      actionLabel: "SEND ENCRYPTED CHAT",
      href: "https://wa.me/918090871133"
    },
    {
      icon: Mail,
      title: "Electronic Mailbox",
      value: "stay@dlfmypadcomfort.com",
      actionLabel: "WRITE TO US",
      href: "mailto:stay@dlfmypadcomfort.com"
    },
    {
      icon: Clock,
      title: "Reception & Concierge Hours",
      value: "24 Hours / 7 Days Active",
      actionLabel: "SCHEDULE PICKUP",
      href: "#booking"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-luxury-dark relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-luxury-emerald/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
            Bespoke Liaison
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light tracking-wide text-white uppercase mb-4">
            Contact & Location
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Cards Block */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-8 rounded-3xl glass-card border border-neutral-900 bg-neutral-950/20 flex gap-4">
              <MapPin className="w-8 h-8 text-luxury-gold shrink-0" />
              <div>
                <h4 className="text-xs font-display font-medium text-white tracking-widest uppercase mb-1">
                  Our Sanctuary Address
                </h4>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Vibhuti Khand, Gomti Nagar,<br />
                  Lucknow, Uttar Pradesh, India
                </p>
                <span className="text-[10px] font-mono text-neutral-500 uppercase mt-2 block">
                  CORPORATE HUB DISTRICT
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacts.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-6 rounded-2xl glass-card border border-neutral-900 bg-neutral-950/40 flex flex-col justify-between">
                    <div>
                      <Icon className="w-5 h-5 text-luxury-gold mb-4" />
                      <h4 className="text-[10px] font-display font-medium text-white tracking-widest uppercase mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-sans break-all leading-normal">
                        {item.value}
                      </p>
                    </div>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-[9px] font-mono tracking-widest text-luxury-gold hover:text-white transition-colors uppercase mt-6 flex items-center gap-1 group clickable"
                    >
                      <span>{item.actionLabel}</span>
                      <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Interactive Map Placeholder (Ultra premium dark map vector aesthetic) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-900 relative min-h-[350px] shadow-2xl flex flex-col justify-between p-8 bg-neutral-950/85">
            {/* Ambient subtle glow overlay representing high-end navigation */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-luxury-emerald/10 via-transparent to-transparent pointer-events-none" />

            {/* Simulated premium vector map styling because full iframe maps can clash with aesthetics */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 p-8 text-center">
              <div className="w-20 h-20 bg-luxury-emerald/20 border border-luxury-gold/30 rounded-full flex items-center justify-center text-luxury-gold mb-4 relative animate-pulse">
                <MapPin className="w-8 h-8" />
                <span className="absolute -inset-2 rounded-full border border-luxury-gold/20 animate-ping pointer-events-none" />
              </div>
              
              <h4 className="text-sm font-display tracking-widest text-white uppercase mb-2">
                DLF MyPad Gomti Nagar
              </h4>
              <p className="text-[10px] font-mono text-neutral-400 max-w-sm tracking-wide">
                Latitude: 26.8529° N • Longitude: 80.9995° E <br />
                Vibhuti Khand corporate luxury enclave.
              </p>
            </div>

            {/* Header map toolbar */}
            <div className="w-full flex justify-between items-center z-10 pointer-events-none">
              <span className="text-[9px] font-mono tracking-widest text-luxury-gold uppercase bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
                Gomti Nagar Portal
              </span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">
                Active Enclave
              </span>
            </div>

            {/* Footer map guide and CTA */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 z-10 mt-auto">
              <p className="text-[10px] font-mono text-neutral-500 text-center md:text-left">
                Riverside Mall • Janeshwar Mishra Park • Lulu Mall Environs
              </p>
              <a
                href="https://maps.google.com/?q=DLF+MyPad+Vibhuti+Khand+Gomti+Nagar+Lucknow"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-neutral-900 hover:bg-luxury-gold hover:text-luxury-black border border-neutral-800 hover:border-luxury-gold text-[10px] font-mono tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 clickable"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
