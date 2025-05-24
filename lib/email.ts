import nodemailer from "nodemailer";

export async function sendOtpEmailFunc(email: string, otp: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // your Gmail address
                pass: process.env.EMAIL_PASS, // app password (not Gmail password)
            },
        });

        const info = await transporter.sendMail({
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `
                <div>
                    <h2>Welcome!</h2>
                    <p>Your OTP code is:</p>
                    <h3>${otp}</h3>
                    <p>This code will expire in 10 minutes.</p>
                </div>
            `,
        });

        console.log("OTP email sent:", info.messageId);
    } catch (error) {
        console.error("Failed to send OTP email:", error);
        throw new Error("Failed to send OTP email");
    }
}
