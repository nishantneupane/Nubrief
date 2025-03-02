require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);  // Exit if DB connection fails
    });

const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");

app.use("/api", userRoutes);
app.use("/api/email", emailRoutes);

app.use((err, req, res, next) => {
    console.error("❌ Internal Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
