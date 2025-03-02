export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const response = await fetch("https://newsletter-backend-sg7g.onrender.com/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        let data;
        try {
            // Attempt to parse JSON if the response is not empty
            const text = await response.text();
            console.log(text)
            data = text ? JSON.parse(text) : {};
        } catch (error) {
            console.error("Error parsing JSON:", error);
            data = {};
        }
        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Error subscribing user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}