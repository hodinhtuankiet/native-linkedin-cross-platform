import User from "../models/users.js";
import sendVerificationEmail from "./sendVerificationEmail .js"; // corrected import statement
import crypto from "crypto";

const createNew = async (req, res, next) => {
  try {
    // return json về Clients
    const { name, email, password, profileImage } = req.body;
    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(123).json({ message: "Email already registered" });
    }
    //create a new User
    const newUser = new User({
      name,
      email,
      password,
      profileImage,
    });
    //generate the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    //save the user to the database
    await newUser.save();
    //send the verification email to the registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(202).json({
      message:
        "Registration successful.Please check your mail for verification",
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" }); // corrected message
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
};

export const registerController = {
  createNew,
  verifyEmail,
};
