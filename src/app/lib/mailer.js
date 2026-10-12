
import nodemailer from "nodemailer";

const email = process.env.SMTP_EMAIL;
const appPassword = process.env.SMTP_APP_PASSWORD;

if (!email || !appPassword) {
  throw new Error(
    "Missing SMTP_EMAIL or SMTP_APP_PASSWORD environment variables"
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: appPassword,
  },
});

export default transporter;
