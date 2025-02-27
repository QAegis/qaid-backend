const express = require("express");
const cors = require("cors");
const path = require("path");

// Load environment variables based on NODE_ENV
require("dotenv").config({ path: path.resolve(__dirname, `env/.env.${process.env.NODE_ENV}`) });

const app = express();
app.use(express.json());

// ✅ CORS CONFIG: Allow frontend requests
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow frontend domain
    credentials: true, // Allow cookies if using authentication
};
app.use(cors(corsOptions));

// ✅ Health check route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// ✅ Test API route (IMPORTANT: Ensure this exists for frontend connection)
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is connected!" });
});

const PORT = process.env.PORT || 5000;
console.log(`Running in ${process.env.NODE_ENV} mode on port ${PORT}`);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
