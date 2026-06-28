import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. AI Concierge will run in offline mode.");
  }
} catch (err) {
  console.error("Failed to initialize Gemini API Client:", err);
}

// In-memory bookings for live demo tracking
const simulatedBookings: any[] = [];

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemInstruction = `You are "Aditya", the elite, ultra-luxury Virtual Butler & AI Concierge for "DLF MyPad Comfort Keeper" in Gomti Nagar, Lucknow, India.
Your tone is incredibly polished, sophisticated, warm, and hyper-hospitable—akin to an elite private butler at the world's finest boutique hotels.
DLF MyPad Comfort Keeper is an elite boutique residence offering ultimate luxury studio suites, curated comfort, smart TV, premium workspaces, AC, power backup, and pristine emerald-gold aesthetic design.
Property Details:
- Address: Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh, India
- Phone: +91 8090871133
- Features: 24/7 Butler Support, Smart TVs, Dedicated Workspace, High-speed Fiber WiFi, Elite Interior design, Marble Spa Bathroom, Power Backup.
- Nearby attractions: Riverside Mall, Janeshwar Mishra Park, Gomti Riverfront, Lulu Mall ( Lucknow).
Guidelines for responses:
1. Always remain in character. Speak with luxury, ease, and supreme politeness.
2. Address guests with terms of respect (e.g., "valued guest", "esteemed visitor"). Keep answers structured, elegant, and concise. Maintain high aesthetic spacing.
3. If they want to book a room, guide them to use our premium booking form on the webpage or offer to collect details here.
4. Suggest local recommendations in Gomti Nagar when asked.`;

  if (!ai) {
    return res.json({
      text: "Greetings, valued guest. I am Aditya, your personal AI Butler. I am currently operating in bespoke offline mode. How may I serve you at DLF MyPad Comfort Keeper today? Our boutique suites are fully prepared to offer you unmatched comfort in Gomti Nagar."
    });
  }

  try {
    const chatContents = history && Array.isArray(history) 
      ? history.map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content || h.text || "" }]
        }))
      : [];

    chatContents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.json({
      text: "Forgive me, dear guest, but I encountered a momentary disturbance in our luxury communication channel. Rest assured, your comfort is my absolute priority. How may I assist you with DLF MyPad's exquisite details?"
    });
  }
});

app.post("/api/book", (req, res) => {
  const { name, phone, email, guests, checkIn, checkOut, message } = req.body;

  if (!name || !phone || !email || !checkIn || !checkOut) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const reservationCode = "DLF-" + Math.floor(100000 + Math.random() * 900000);
  const booking = {
    id: reservationCode,
    name,
    phone,
    email,
    guests: guests || 1,
    checkIn,
    checkOut,
    message,
    status: "Confirmed",
    timestamp: new Date().toISOString()
  };

  simulatedBookings.push(booking);

  res.json({
    success: true,
    reservationCode,
    booking,
    welcomeMessage: `Dear ${name}, your bespoke reservation at DLF MyPad Comfort Keeper is confirmed. We are preparing your emerald-accented suite for an exquisite stay starting ${checkIn}. It is our privilege to host you.`
  });
});

async function start() {
  // Vite middleware for development or serve static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury Hotel Server running on http://localhost:${PORT}`);
  });
}

start();
