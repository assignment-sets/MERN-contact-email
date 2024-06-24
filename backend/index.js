import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000", // Your local frontend URL
  "http://localhost:5173", // Vite's default dev server URL
  "https://mern-contact-page.vercel.app", // Your deployed frontend URL
  // Add any other allowed origins here
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.status(200).send("connected");
});

app.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("send all the required items");
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "gourab.m099@gmail.com",
      subject: "New Query",
      text: message,
      html: `<b>${message}</b>`,
    });

    res.status(200).send("email sent");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong !");
  }
});

// Add this line to export the app
export default app;

// If you want to run the server when not on Vercel, you can add:
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
