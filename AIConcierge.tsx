import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Volume2, VolumeX, Sparkles, User, ShieldAlert } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "Greetings, esteemed guest. I am Aditya, your personal digital butler here at DLF MyPad Comfort Keeper. It is an absolute privilege to attend to your requests. How may I elevate your comfort today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle TTS
  const speakText = (text: string) => {
    if (!isVoiceEnabled) return;
    try {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt to find a premium, warm English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) => 
          (voice.name.includes("Google") && voice.lang.includes("en")) ||
          (voice.name.includes("Premium") && voice.lang.includes("en")) ||
          voice.lang.includes("en-IN") ||
          voice.lang.includes("en-GB")
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.pitch = 0.95; // slightly deeper, warm, butler-like
      utterance.rate = 0.95; // measured and elegant pace
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("TTS engine failed:", e);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Map message log to server-expected history format
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyPayload })
      });

      if (!res.ok) throw new Error("Connection failed");
      const data = await res.json();

      const butlerMsg: ChatMessage = {
        id: `butler-${Date.now()}`,
        role: "model",
        text: data.text || "Forgive me, but I met a minor delay. Rest assured, I am here to assist.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, butlerMsg]);
      speakText(butlerMsg.text);
    } catch (error) {
      console.error("AI Error:", error);
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        text: "My apologies, valued guest. A slight ripple in our digital network occurred. Please rest assured we are standing by to serve you. You can contact us directly at +91 8090871133.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Predefined Luxurious Concierge Queries
  const quickRequests = [
    "What is the contact number & location?",
    "Tell me about Gomti Nagar attractions",
    "What luxury suites do you offer?",
    "How do I reserve a room?"
  ];

  return (
    <>
      {/* Floating Action Glass Bubble */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="ai-butler-bubble"
          className="flex items-center gap-3 bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-luxury-black p-4 rounded-full shadow-[0_10px_30px_rgba(193,150,85,0.4)] relative border border-white/10 focus:outline-none cursor-pointer clickable"
          title="Virtual Butler Aditya"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase hidden md:inline">
            Butler Aditya
          </span>
          {/* Glowing pulse ring */}
          <span className="absolute -inset-1 rounded-full border border-luxury-gold/50 animate-ping opacity-20 pointer-events-none" />
        </motion.button>
      </div>

      {/* Concierge Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 50, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 50, x: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-full max-w-[380px] h-[520px] rounded-3xl overflow-hidden glass-card-emerald border border-luxury-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col pointer-events-auto"
          >
            {/* Header Column */}
            <div className="p-5 border-b border-luxury-gold/15 bg-luxury-black/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Visual Portrait */}
                <div className="relative w-10 h-10 rounded-full bg-luxury-gold/15 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
                  <User className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-luxury-black animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-display font-medium text-white tracking-widest uppercase">
                    Butler Aditya
                  </h3>
                  <span className="text-[9px] font-mono text-neutral-400 tracking-wider">
                    Virtual AI Butler • Online
                  </span>
                </div>
              </div>

              {/* Header Right Tools */}
              <div className="flex items-center gap-2">
                {/* TTS Toggle Button */}
                <button
                  onClick={() => {
                    setIsVoiceEnabled(!isVoiceEnabled);
                    if (!isVoiceEnabled) {
                      speakText("Voice butler mode initiated.");
                    } else {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={`p-2 rounded-full border transition-all duration-300 clickable ${
                    isVoiceEnabled 
                      ? "bg-luxury-gold/20 text-luxury-gold border-luxury-gold" 
                      : "bg-neutral-900/60 text-neutral-500 border-neutral-800"
                  }`}
                  title={isVoiceEnabled ? "Mute Voice Butler" : "Enable Voice Butler"}
                >
                  {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-neutral-900/60 text-neutral-400 hover:text-white rounded-full border border-neutral-800 transition-colors clickable"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Conversational Screen Messages */}
            <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-luxury-black/35">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[85%] ${
                    m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-[11px] font-sans leading-relaxed tracking-wide ${
                      m.role === "user"
                        ? "bg-luxury-gold text-luxury-black font-medium rounded-tr-none"
                        : "glass-card text-neutral-200 border-luxury-gold/10 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[8px] font-mono text-neutral-500 mt-1 uppercase">
                    {m.role === "user" ? "You" : "Butler Aditya"}
                  </span>
                </div>
              ))}

              {/* Typing Loader Indicator */}
              {isLoading && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-neutral-950/40 border border-neutral-900 max-w-[60px]">
                  <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions & Input Footer */}
            <div className="p-4 border-t border-luxury-gold/15 bg-luxury-black/75">
              
              {/* Quick Prompt Pill Horizontal List */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none mb-2">
                {quickRequests.map((req) => (
                  <button
                    key={req}
                    onClick={() => handleSendMessage(req)}
                    className="shrink-0 px-3 py-1.5 bg-neutral-900 hover:bg-luxury-emerald/30 border border-neutral-800 hover:border-luxury-gold/30 rounded-full text-[9px] font-mono tracking-wider text-neutral-300 hover:text-luxury-gold transition-all uppercase clickable"
                  >
                    {req}
                  </button>
                ))}
              </div>

              {/* Form Input Row */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Inquire about suites, check-in..."
                  className="flex-grow bg-neutral-900 border border-neutral-800/80 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold/50 transition-colors font-sans"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-3 bg-luxury-gold text-luxury-black rounded-full shadow hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer clickable"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
