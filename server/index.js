import express from "express";
import connectDB from "./config/database.js";
import cors from "cors";
import config from "config";
import dotenv from "dotenv";
const app = express();

// connect to database
connectDB();
dotenv.config();
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(cors());

// ROUTES
import postRoutes from "./routes/posts.js";

// DEFINED ROUTES
app.use("/posts", postRoutes);

// listen for
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello to memories API");
});

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
