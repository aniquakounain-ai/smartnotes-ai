import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("🚀 SmartNotes AI Backend Running");
});

// Start server only after MongoDB connects
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("==================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("==================================");
    });
  } catch (err) {
    console.error("❌ Failed to start server");
    console.error(err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION");
  console.error(err);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);
});

startServer();