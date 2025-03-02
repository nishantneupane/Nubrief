import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Make API call to the backend service
        const response = await axios.post("https://newsletter-backend-sg7g.onrender.com/api/email/send-newsletter", {
            email
        });

        return res.status(200).json({ message: `Newsletter sent to ${email}` });
    } catch (error) {
        console.error("Error sending newsletter:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Failed to send newsletter." });
    }
}

