const sgMail = require("@sendgrid/mail");
const { fetchTopStoriesByCategory } = require("./newsService");
const { summarizeArticle } = require("./aiService");
const User = require("../models/User");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { execSync } = require("child_process");


function getWisdomFromSmalltalk() {
    try {
        // Run Smalltalk script and clean up output
        const output = execSync("gst -f services/wisdomGenerator.st").toString().trim();

        // Validate if output is valid JSON
        let wisdom;
        try {
            wisdom = JSON.parse(output);
        } catch (jsonError) {
            console.error("❌ Invalid JSON from Smalltalk:", output);
            throw new Error("Malformed JSON received from Smalltalk.");
        }

        // Ensure all expected properties exist
        if (!wisdom.quote || !wisdom.question || !wisdom.choices || !wisdom.answer) {
            throw new Error("Missing expected wisdom fields in JSON.");
        }

        return wisdom;
    } catch (error) {
        console.error("❌ Error getting wisdom from Smalltalk:", error);
        return {
            quote: "“Knowledge speaks, but wisdom listens.”",
            question: "Who said this famous quote?",
            choices: "Socrates, Plato, Aristotle, Jimi Hendrix",
            answer: "Jimi Hendrix"
        };
    }
}

module.exports = { getWisdomFromSmalltalk };

async function sendNewsletter(email) {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found.");

        const userCategories = user.categories || [];
        if (userCategories.length === 0) return;

        const articlesByCategory = await fetchTopStoriesByCategory();
        const filteredArticles = {};
        userCategories.forEach(category => {
            if (articlesByCategory[category]) {
                filteredArticles[category] = articlesByCategory[category];
            }
        });

        if (Object.keys(filteredArticles).length === 0) return;

        // 🏆 Get Wisdom of the Day from Smalltalk
        const wisdom = getWisdomFromSmalltalk();

        // ✉️ Build the Newsletter Content
        let newsletter = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
    
        <!-- ✅ NuBrief Branding -->
                    <div style="text-align: center; padding-bottom: 15px;">
                        <img src="https://yourdomain.com/logo.png" alt="NuBrief Logo" style="max-width: 120px;">
                        <h1 style="color: #007bff; font-size: 24px; margin: 5px 0;">NuBrief - Your Personalized News Digest</h1>
                        <p style="color: #555; font-size: 16px;">Stay informed with curated news from your favorite categories.</p>
                    </div>
    
                    <!-- 🏆 Wisdom of the Day -->
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #007bff;">💡 Wisdom of the Day</h2>
                        <p style="font-size: 16px; font-style: italic;">"${wisdom.quote}"</p>
                        <h3 style="font-size: 18px; color: #333;">Trivia: ${wisdom.question}</h3>
                        <p style="font-size: 16px; color: #555;">Choices: ${wisdom.choices}</p>
                    </div>
    
                    <hr style="border: 1px solid #ddd; margin: 20px 0;">
            `;

        for (const [category, articles] of Object.entries(filteredArticles)) {
            newsletter += `<h2 style="font-size: 20px; color: #007bff; text-transform: capitalize;">${category}</h2>`;
            for (const [index, article] of articles.entries()) {
                const summaryObj = await summarizeArticle(article);
                const summary = summaryObj.summary || "Summary not available.";
                const imageUrl = article.image_url && article.image_url.startsWith("http")
                    ? article.image_url
                    : "https://via.placeholder.com/600x300?text=No+Image+Available";

                newsletter += `
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <h3 style="font-size: 18px; color: #333; margin: 10px 0;">${index + 1}. ${article.title}</h3>
                            <img src="${imageUrl}" alt="News Image" style="width:100%; max-width:600px; border-radius:5px; display:block; margin: 10px auto;">
                            <p style="font-size: 16px; color: #555;">${summary}</p>
                            <a href="${article.url}" 
                               style="display: inline-block; text-decoration: none; background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; font-size: 14px; margin-top: 10px;">
                                Read More
                            </a>
                        </div>
                    `;
            }
        }

        // 📢 Reveal the Wisdom Answer at the Bottom
        newsletter += `
                <div style="background: #eef9ff; padding: 10px; border-radius: 8px; text-align: center; margin-top: 20px;">
                    <h3 style="color: #007bff;">✅ Wisdom Challenge Answer</h3>
                    <p style="font-size: 16px; font-weight: bold; color: #333;">The correct answer was: <span style="color: #28a745;">${wisdom.answer}</span></p>
                </div>
    
                <!-- 🔥 Unsubscribe Section -->
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <h3 style="color: #d9534f;">⚠️ Unsubscribe</h3>
                    <p style="font-size: 14px; color: #555;">No longer want to receive these emails?</p>
                    <a href="http://localhost:3000/unsubscribe" 
                       style="text-decoration: none; background: #d9534f; color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px;">
                        Unsubscribe
                    </a>
                </div>
            </div>
            `;

        // ✉️ Send the Email
        await sgMail.send({ to: email, from: "news@nubrief.co", subject: "🗞️ Your Personalized News Digest", html: newsletter });
        console.log(`✅ Newsletter sent to ${email}`);
    } catch (error) {
        console.error(`❌ Error sending newsletter to ${email}:`, error);
    }
}

module.exports = { sendNewsletter };