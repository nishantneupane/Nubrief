**NuBrief - Personalized AI-Driven News Digest**

Instead of relying on human writers to summarize news, we built NuBrief, an entirely AI-driven newsletter that curates and delivers personalized news straight to your inbox. Using Google Gemini AI, it autonomously summarizes top stories, ensuring you get the most important updates without the clutter. Whether you prefer daily or weekly digests, NuBrief keeps you informed—effortlessly.

🚀 Live Deployment: www.nubrief.co

✨ Features

✅ News Personalization – Users can subscribe to news categories like Tech, Business, Sports, Politics, and more.
✅ AI-Powered Summaries – Uses Google Gemini AI to generate concise news summaries.
✅ Smalltalk Wisdom Generator – Daily wisdom quotes & trivia, implemented in Smalltalk and embedded in emails.
✅ Fully Hosted – The backend is deployed on Render, and the frontend is live at www.nubrief.co.
✅ Unsubscribe & Preferences – Users can manage subscriptions and change preferences anytime.

🛠 Tech Stack
    •   Frontend: Next.js, React
    •   Backend: Node.js, Express.js, MongoDB (Atlas)
    •   AI Services: Google Gemini AI (for article summaries)
    •   Smalltalk Integration: Smalltalk-powered Wisdom Generator
    •   Email Service: SendGrid API
    •   Hosting: Render

🚀 Productivity Category: Why NuBrief is a Game-Changer

NuBrief isn’t just a news aggregator—it’s a productivity tool designed for busy professionals, students, and knowledge workers to get information they need to know fast. Here’s why it excels:

✅ Saves Time – No need to browse multiple sources—NuBrief delivers only what’s relevant to your inbox.
✅ AI-Powered Insights – Google Gemini AI extracts key takeaways, eliminating information overload.
✅ Curated & Personalized – Focus on topics that matter—get business insights, industry news, or even research trends.
✅ Boosts Decision-Making – Stay ahead of the curve with actionable knowledge in seconds, not hours.
✅ Daily Wisdom & Trivia – Get an extra boost of critical thinking with Smalltalk-powered wisdom challenges at the end of each newsletter.

🔹 Who is NuBrief for?
📌 Entrepreneurs & Executives – Quick access to essential news for informed decisions.
📌 Students & Researchers – AI-summarized academic news and business insights.
📌 Tech Professionals – Stay updated on AI, programming, and emerging technologies.
📌 Investors & Analysts – Get financial and stock market news without information overload.
📌 Anyone Who Values Their Time – Reduce distractions and consume news efficiently.

🔹 Gemini AI Usage / Generative AI Beginner Category

NuBrief integrates Google Gemini AI to generate concise news summaries.
✅ When a user receives a newsletter, Gemini AI summarizes articles dynamically.
✅ This is implemented in the emailService.js file, under summarizeArticle().

🧠 Smalltalk Integration

We use Smalltalk to generate daily wisdom quotes and trivia challenges.
✅ The Wisdom Generator is written in Smalltalk (wisdomGenerator.st).
✅ It runs in the backend and inserts a daily quote & trivia into each email.
✅ Users get to see the answer to the trivia at the bottom of the email.

📩 API Endpoints

Method  Endpoint    Description
POST    /api/subscribe  Subscribe a user
POST    /api/unsubscribe    Unsubscribe a user
POST    /api/sendNewsletter Manually send a newsletter
GET /api/top-stories    Fetch top news articles
POST    /api/summarize  Summarize a given text using Gemini AI


📡 Deployment Details

✅ Frontend: Hosted on Render - www.nubrief.co
✅ Backend: Hosted on Render - API Base URL

📬 Stay Informed with NuBrief!

Built with 💙 for people who love quick, curated news.
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
