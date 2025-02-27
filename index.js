const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load the correct environment file
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`Backend is running in ${process.env.NODE_ENV || "development"} mode!`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`));
