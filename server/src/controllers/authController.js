import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(401).json({ message: "All fields are mandatory" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "User Registered Successfully",
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all credentials",
      });
    }
    const isValidUser = await User.findOne({ email });
    if (!isValidUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const isValidPassword = await bcryptjs.compare(
      password,
      isValidUser.password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    } else {
      generateToken(isValidUser._id, res);
      return res.status(201).json({
        _id: isValidUser._id,
        email: isValidUser.email,
        profilePic: isValidUser.profilePic,
        message: "User logged in Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  const { token } = req.body;
  try {
    if (token) {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(201).json({
        message: "User logged out  Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
  } catch (error) {}
};
