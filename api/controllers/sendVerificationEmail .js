import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "kiethdt.22ite@vku.udn.vn",
      pass: "dnaoxfiodneugwbf",
    },
  });
  const mailOptions = {
    from: "hodinhtuankiet@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `please click the following link to verify your email : http://localhost:3000/verify/${verificationToken}`,
  };

  //send the mail
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending the verification email", error);
  }
};

export default sendVerificationEmail;
