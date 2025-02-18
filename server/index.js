const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Ensure correct API routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app; // ✅ Required for Vercel

// Only start the server locally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
