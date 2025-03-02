import { useState, useEffect } from "react";
import Image from "next/image";

export default function UnsubscribePage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔥 Ensure no white borders appear
    useEffect(() => {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.width = "100vw";
        document.body.style.height = "100vh";
    }, []);

    const handleUnsubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!validateEmail(email)) {
            setMessage("❌ Please enter a valid email address.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://newsletter-backend-sg7g.onrender.com/api/unsubscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ You have been unsubscribed successfully.");
            } else if (response.status === 404) {
                setMessage("⚠️ Email not found. Did you mean to subscribe instead?");
            } else {
                setMessage(data.error || "❌ An error occurred. Please try again.");
            }
        } catch (error) {
            setMessage("❌ Failed to connect to the server. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+$/.test(email);

    return (
        <div style={styles.container}>
            <div style={styles.unsubscribeBox}>
                <div style={styles.header}>
                    <Image src="/logo.png" alt="NuBrief Logo" width={50} height={50} />
                    <h1 style={styles.title}>Unsubscribe</h1>
                </div>

                <p style={styles.subtitle}>We’re sad to see you go. Enter your email below to unsubscribe.</p>

                <form onSubmit={handleUnsubscribe} style={styles.form}>
                    <div style={styles.inputWrapper}>
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />

                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? "Processing..." : "Unsubscribe"}
                        </button>
                    </div>
                </form>

                {message && <p style={{ ...styles.message, color: message.includes("✅") ? "#28a745" : "#dc3545" }}>{message}</p>}

                <div style={styles.footer}>
                    <a href="/" style={styles.backLink}>Go Back</a>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: "absolute",
        margin: "0",
        padding: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298, #005aa7)",
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box", // ✅ Ensures content fits without overflow
    },
    unsubscribeBox: {
        width: "100%",
        maxWidth: "500px",
        padding: "40px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        marginBottom: "20px",
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        color: "#fff",
    },
    subtitle: {
        fontSize: "16px",
        color: "#ddd",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
    },
    inputWrapper: {
        display: "flex",
        width: "100%",
        gap: "10px",
    },
    input: {
        flex: 1,
        padding: "12px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "rgba(209, 206, 206, 0.9)",
        textAlign: "center",
        transition: "0.3s ease-in-out",
    },
    button: {
        padding: "12px 18px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#d9534f",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.3s ease-in-out",
        minWidth: "120px",
    },
    message: {
        marginTop: "15px",
        fontSize: "14px",
        padding: "10px",
        borderRadius: "5px",
    },
    footer: {
        marginTop: "18px",
    },
    backLink: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#fff",
        textDecoration: "none",
        transition: "0.3s",
    },
};
