import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Users, Mail, Phone, User, MessageSquare, ClipboardCheck, ArrowRight, Loader2 } from "lucide-react";

interface BookingFormProps {
  preselectedRoom?: string;
}

export default function BookingForm({ preselectedRoom }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "1",
    room: preselectedRoom || "Luxury Studio Suite",
    checkIn: "",
    checkOut: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingConfirmation, setBookingConfirmation] = useState<any | null>(null);

  // Sync preselected room prop
  useEffect(() => {
    if (preselectedRoom) {
      setFormData((prev) => ({ ...prev, room: preselectedRoom }));
    }
  }, [preselectedRoom]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.phone || !formData.email || !formData.checkIn || !formData.checkOut) {
      setError("Please complete all essential details to confirm your stay.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Booking failed");
      const data = await res.json();

      if (data.success) {
        setBookingConfirmation(data);
      } else {
        setError("Our neural booking registry is busy. Please try once again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to reach reservation server. Please contact us at +91 8090871133.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setBookingConfirmation(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      guests: "1",
      room: "Luxury Studio Suite",
      checkIn: "",
      checkOut: "",
      message: ""
    });
  };

  return (
    <section id="booking" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-luxury-emerald/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono tracking-[0.4em] text-luxury-gold uppercase mb-3 block">
            Bespoke Reservation Portal
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light tracking-wide text-white uppercase mb-4">
            Secure Your Stay
          </h2>
          <div className="h-[1px] w-16 bg-luxury-gold mx-auto" />
        </div>

        <AnimatePresence mode="wait">
          {!bookingConfirmation ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleBookNow}
              className="p-8 md:p-12 rounded-3xl glass-card border border-luxury-gold/15 bg-neutral-950/40 relative shadow-2xl"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-950/40 border border-red-900/60 text-red-300 rounded-2xl text-xs font-mono text-center tracking-wide">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Full Name */}
                <div className="relative">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Guest Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold/60" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:gold-glow transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold/60" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 8090871133"
                      className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:gold-glow transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="relative">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold/60" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. guest@luxury.com"
                      className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:gold-glow transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="relative">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Total Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold/60" />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:gold-glow transition-all font-sans appearance-none"
                    >
                      <option value="1" className="bg-luxury-dark">1 Adult</option>
                      <option value="2" className="bg-luxury-dark">2 Adults</option>
                      <option value="3" className="bg-luxury-dark">3 Adults (Suite Rollaway)</option>
                      <option value="4" className="bg-luxury-dark">4 Adults (Suite Family)</option>
                    </select>
                  </div>
                </div>

                {/* Selected Suite Type */}
                <div className="relative md:col-span-2">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Accomodation Category</label>
                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:gold-glow transition-all font-sans appearance-none"
                  >
                    <option value="Luxury Studio Suite" className="bg-luxury-dark">Luxury Studio Suite — ₹4,500 / night</option>
                    <option value="Executive Workspace Suite" className="bg-luxury-dark">Executive Workspace Suite — ₹6,000 / night</option>
                    <option value="Royal Bath Penthouse Suite" className="bg-luxury-dark">Royal Bath Penthouse Suite — ₹7,500 / night</option>
                  </select>
                </div>

                {/* Check-In Date */}
                <div className="relative">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Check-In Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold/60" />
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:gold-glow transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Check-Out Date */}
                <div className="relative">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Check-Out Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gold/60" />
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:gold-glow transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="relative md:col-span-2">
                  <label className="text-[9px] font-mono tracking-[0.2em] text-neutral-400 uppercase block mb-2">Special Request / Dietary / Arrival Note</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-luxury-gold/60" />
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please convey any airport pickup requests, twin bed splits, or pillow selections..."
                      className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-luxury-gold/50 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:gold-glow transition-all font-sans resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-dark text-luxury-black text-xs font-mono font-semibold tracking-widest py-4 rounded-2xl shadow-xl hover:brightness-110 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer clickable"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SYNCHRONIZING SECURE ESCROW...</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRM BESPOKE RESERVATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            /* Luxurious Reservation Receipt Card */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 md:p-12 rounded-3xl glass-card-emerald border border-luxury-gold/40 relative shadow-2xl text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-luxury-gold/15 border border-luxury-gold flex items-center justify-center mx-auto text-luxury-gold mb-6 animate-pulse">
                <ClipboardCheck className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-display font-light text-white tracking-widest uppercase mb-2">
                BESPOKE CONFIRMATION
              </h3>
              
              <p className="text-[10px] font-mono text-neutral-400 tracking-[0.3em] uppercase mb-8">
                Reservation Code: <span className="text-luxury-gold font-bold">{bookingConfirmation.reservationCode}</span>
              </p>

              {/* Receipt Grid */}
              <div className="grid grid-cols-2 gap-4 text-left border-y border-luxury-gold/15 py-6 mb-8 text-[11px] font-sans">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">Guest Name</span>
                  <span className="text-neutral-200 font-medium">{bookingConfirmation.booking.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">Room Category</span>
                  <span className="text-neutral-200 font-medium">{bookingConfirmation.booking.room}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">Check-In Arrival</span>
                  <span className="text-neutral-200 font-medium">{bookingConfirmation.booking.checkIn}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">Check-Out Departure</span>
                  <span className="text-neutral-200 font-medium">{bookingConfirmation.booking.checkOut}</span>
                </div>
              </div>

              {/* Welcome Message */}
              <p className="text-xs text-neutral-300 font-serif italic leading-relaxed mb-8 px-4">
                "{bookingConfirmation.welcomeMessage}"
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-neutral-800 hover:border-luxury-gold text-neutral-400 hover:text-white text-[10px] font-mono tracking-widest rounded-full transition-colors clickable"
                >
                  NEW BOOKING
                </button>
                <a
                  href="#home"
                  className="px-6 py-3 bg-luxury-gold text-luxury-black text-[10px] font-mono tracking-widest font-semibold rounded-full flex items-center justify-center gap-1 hover:brightness-110 transition-all clickable"
                >
                  RETURN TO HOME
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
