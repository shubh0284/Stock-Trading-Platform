require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ROUTES
const authRoute = require("./Routes/AuthRoute");

// MODELS
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

// ✅ INITIALIZE APP FIRST
const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "http://localhost:3001", // dashboard (if any)
      "https://your-frontend-domain.com", // AWS later
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ---------- AUTH ROUTES ---------- */
app.use("/", authRoute);

/* ---------- DASHBOARD APIs ---------- */
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch positions" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel(req.body);
    await newOrder.save();
    res.json({ success: true, message: "Order saved!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order failed" });
  }
});

/* ---------- DATABASE ---------- */
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  });

/* ---------- SERVER ---------- */
const HOST = "0.0.0.0"; // Add this line

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
