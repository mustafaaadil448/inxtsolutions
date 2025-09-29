import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentdata.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url, req.body);
    next();
});

// Routes
app.use("/api/students", studentRoutes);

// 404 handler (invalid route)
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.message);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
