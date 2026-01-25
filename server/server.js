require("./config/db");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const User = require("./module/User");
const Otp = require("./module/Otp");

const app = express();

app.use(cors());
app.use(express.json()); // ⭐ IMPORTANT

app.get("/", (req, res) => {
    res.send("hello civica");
});


const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sachithbalaka@gmail.com",     // ✅ Replace with your Gmail address
                pass: "pcgksspwidoackt d".replace(/\s+/g, ""), // ✅ App password (no spaces)
            },
        });

app.post("/send_otp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    const mailOptions = {
        from: "sachithbalaka@gmail.com",
        to: email,
        subject: "Civica OTP Verification",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "OTP sent successfully" });
    } catch (err) {
        console.error("Error sending email:", err);
        return res.json({ success: false, message: "Email sending failed" });
    }
});
app.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) {
        return res.json({ success: false, message: "Invalid OTP" });
    }

    await Otp.deleteMany({ email });

    return res.json({ success: true, message: "OTP verified" });
});
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({ email, password: hashedPassword });
        return res.json({ success: true, message: "Signup successful" });
    } catch {
        return res.json({ success: false, message: "Signup failed" });
    }
});
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required"
        });
    }

    const user = await User.findOne({ email });

    if (!user || !user.password) {
        return res.json({
            success: false,
            message: "User not found or password not set"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({
            success: false,
            message: "Incorrect password"
        });
    }

    return res.json({
        success: true,
        message: "Signin successful"
    });
});

app.listen(2000,()=>{
    console.log("Server is running on port 2000");
})