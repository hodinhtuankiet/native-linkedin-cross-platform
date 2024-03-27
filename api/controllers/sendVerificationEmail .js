import { StatusCodes } from 'http-status-codes'
import User from '../models/users'; 

const sendVerificationEmail  = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sujananand0@gmail.com",
          pass: "rnzcugnscqtqiefs",
        },
      });
      const mailOptions = {
        from: "linkedin@gmail.com",
        to: email,
        subject: "Email Verification",
        text: `please click the following link to verify your email : http://localhost:3000/verify/${verificationToken}`,
      };
    
      //send the mail
      try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
      } catch (error) {
        console.log("Error sending the verification email");
      }
}

export const registerController = {
  createNew
}