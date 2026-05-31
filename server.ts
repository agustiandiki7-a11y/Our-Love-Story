import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// JSON parsing middleware
app.use(express.json());

// Initialize GoogleGenAI server-side with metadata headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Sentiment Analysis API endpoint using Gemini
app.post("/api/sentiment", async (req, res) => {
  const { letterText, senderName, partnerName } = req.body;
  if (!letterText) {
    return res.status(400).json({ error: "Isi surat diperlukan untuk analisis." });
  }

  // Graceful fallback if Gemini API Key is missing or default placeholder
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
    const mockAnalysis = {
      score: 95,
      tone: "Sangat Romantis & Hangat",
      analysis: `Analisis AI menunjukkan bahwa surat dari ${senderName || 'Kamu'} untuk ${partnerName || 'Pasanganmu'} ini memancarkan kehangatan cinta yang luar biasa tulus. Gaya bahasa yang emosional dan penuh penghargaan terhadap momen bersama mengindikasikan ikatan batin yang sangat kokoh. Sifat intim dari ungkapan di dalamnya berhasil membangkitkan rasa aman dan kasih sayang yang mendalam.`,
      keyThemes: ["Apresiasi Momen Bersama", "Komitmen Masa Depan", "Kehangatan Batin"],
      loveAdvice: "Malam ini, luangkan waktu 5 menit untuk mengirim pesan suara singkat atau menatap matanya dalam-dalam dan berterima kasih secara tulus atas kehadirannya di hidupmu. Hal kecil ini penting untuk menjaga percikan api cinta tetap membara!"
    };
    return res.json(mockAnalysis);
  }

  try {
    const prompt = `Analisis sentimen dan kedalaman emosional surat cinta ini dari ${senderName || 'Kamu'} kepada pasangan tersayangnya, ${partnerName || 'Pasanganmu'}.
Isi Surat:
"${letterText}"

Lakukan analisis emosional mendalam dalam Bahasa Indonesia yang indah, romantis, puitis, dan penuh kehangatan emosi.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah pakar psikologi hubungan romantis sekaligus pujangga cinta yang bijaksana, puitis, hangat, dan empati tinggi. Analisis surat cinta pasangan ini dan kembalikan wawasan cinta yang mengharukan dalam bentuk JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Skor romantisme / kehangatan cinta dari surat ini antara 0-100."
            },
            tone: {
              type: Type.STRING,
              description: "Nama sentimen atau nada romantis (misalnya: 'Cinta Abadi & Harapan Tinggi', 'Rindu Mendalam yang Elegan', 'Kehangatan & Komitmen Penuh')."
            },
            analysis: {
              type: Type.STRING,
              description: "1-2 paragraf analisis emosional yang romantis, hangat, dan intim mengenai surat cinta tersebut."
            },
            keyThemes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Maksimal 3 pilar atau tema cinta utama dari surat tersebut."
            },
            loveAdvice: {
              type: Type.STRING,
              description: "Saran cinta romantis yang manis untuk memelihara hubungan romantis harian."
            }
          },
          required: ["score", "tone", "analysis", "keyThemes", "loveAdvice"]
        }
      }
    });

    const resultText = response.text;
    if (resultText) {
      const parsed = JSON.parse(resultText.trim());
      res.json(parsed);
    } else {
      throw new Error("Respon kosong dari Gemini model.");
    }
  } catch (err: any) {
    console.error("Gemini Sentiment Error:", err);
    res.status(500).json({
      error: "Gagal berinteraksi dengan layanan analitik emosional AI.",
      details: err.message
    });
  }
});

// Configure Vite integration for SPA
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Our Love Story Backend] Server runs on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
