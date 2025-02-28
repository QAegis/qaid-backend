import nodemailer from "nodemailer";
import crypto from "crypto";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Generate a random token
    const token = crypto.randomBytes(20).toString("hex");

    // Construct the verification link
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register?token=${token}`;

    try {
        // Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email Content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Complete Your Registration",
            html: `
                <p>Click the button below to start your registration:</p>
                <a href="${verificationLink}" 
                    style="display:inline-block; padding:10px 20px; background:#2D767F; color:white; text-decoration:none; border-radius:5px;">
                    Start Freemium
                </a>
                <p>Or copy this link into your browser: <br /> ${verificationLink}</p>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
}
