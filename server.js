// server.js
const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],       
    allowedHeaders: ["Content-Type"], 
  })
);

// API endpoint
app.post("/api/summarize", async (req, res) => {
  try {
    const { text, length, style } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Summarize the following lecture notes into flashcards. 
            Length: ${length}. 
            Style: ${style}. 
            Notes: ${text}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      console.error("❌ OpenAI API error:", data);
      res.status(500).json({ error: data });
    }
  } catch (error) {
    console.error("❌ Server crashed:", error);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

