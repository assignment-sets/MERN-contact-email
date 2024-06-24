import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 2000;

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
      from: `"${name}" <${email}>`, // sender address using name and email from the request
      to: "gourab.m099@gmail.com", // list of receivers
      subject: "New Query", // Subject line
      text: message, // plain text body using the message from the request
      html: `<b>${message}</b>`,
    });

    res.status(200).send("email sent");
  } catch (error) {
    console.log(error);
    res.send(500).send("something went wrong !");
  }
});

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
});
