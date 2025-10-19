// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Serve everything inside the 'portfolio' folder
app.use(express.static(path.join(__dirname, "portfolio")));

// Default route — serve main.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "portfolio", "main.html"));
});

// Optional route (only for debugging the JSON)
app.get("/data/projects.json", (req, res) => {
  res.sendFile(path.join(__dirname, "portfolio", "data", "projects.json"));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

