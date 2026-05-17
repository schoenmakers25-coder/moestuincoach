// Moestuin.nl — development server
// Serves static files + proxies /api/chat to Anthropic.
//
// Setup:
//   npm install @anthropic-ai/sdk
//   set ANTHROPIC_API_KEY=sk-ant-...   (of maak een .env bestand)
//   node server.js
//
// Open http://localhost:3000

const http = require("http");
const fs = require("fs");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

require("dotenv").config({ override: false }); // optioneel — npm install dotenv

const PORT = process.env.PORT || 3000;
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".jsx":  "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico":  "image/x-icon",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".woff2":"font/woff2",
};

async function handleChat(req, res) {
  let body = "";
  req.on("data", d => { body += d; });
  req.on("end", async () => {
    try {
      const { system, messages } = JSON.parse(body);
      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system,
        messages,
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    } catch (err) {
      console.error("Anthropic error:", err.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
}

const server = http.createServer((req, res) => {
  // CORS — handy for local dev
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  // API route
  if (req.method === "POST" && req.url === "/api/chat") {
    return handleChat(req, res);
  }

  // Static file serving
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";

  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found: " + urlPath);
      } else {
        res.writeHead(500);
        res.end("500 Internal Server Error");
      }
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Moestuin.nl draait op http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("⚠  ANTHROPIC_API_KEY is niet ingesteld — /api/chat zal falen.");
    console.warn("   Voeg ANTHROPIC_API_KEY=sk-ant-... toe aan je omgeving of een .env bestand.");
  }
});
