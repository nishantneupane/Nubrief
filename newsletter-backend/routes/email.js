const express = require("express");
const router = express.Router();
const { sendConfirmationEmail } = require("../services/emailService");

router.post("/send-newsletter", async (req, res) => {
    const { email, categories, frequency } = req.body;
    try {
        await sendConfirmationEmail(email, categories, frequency);
        res.status(200).json({ message: "Newsletter sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending newsletter:", error);
        res.status(500).json({ error: "Failed to send newsletter" });
    }
});

module.exports = router;