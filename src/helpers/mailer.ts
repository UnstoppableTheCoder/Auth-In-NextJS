import User from "@/models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function sendEmail({ email, emailType, userId }: any) {
  const token = crypto.randomBytes(32).toString("hex");

  if (emailType === "VERIFY") {
    await User.findByIdAndUpdate(userId, {
      verifyToken: token,
      verifyTokenExpiry: Date.now() + 1000 * 60 * 60,
    });
  } else if (emailType === "RESET") {
    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 60,
    });
  }

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: "vipendra@gmail.com",
    to: email,
    subject: `${
      emailType === "VERIFY" ? "Verify your email" : "Reset your password"
    }`,
    html: `<p>Click 
      <a href="${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "reset-password"
    }?token=${token}">here</a> 
        to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        } 
        <br> 
        or copy and paste the link below in your browser. 
        <br /> 
        ${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "reset-password"
    }?token=${token}</p>`,
  };

  const mailResponse = await transport.sendMail(mailOptions);
  return mailResponse;
}
