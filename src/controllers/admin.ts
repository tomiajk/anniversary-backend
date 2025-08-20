import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Admin from "../model/Admin";

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await Admin.create({
      email,
      password: hasedPassword,
    });

    if (newUser) {
      return res.status(201).json({ message: "Admin registered successfully" });
    } else {
      res.status(400);
      throw new Error("Error registering user");
    }
  } catch (error) {
    return res.json({
      message: `${error.message}-An error occured at the backend`,
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    //check the database for existing user
    const user = await Admin.findOne({ email });
    if (!user)
      return res.status(204).json({
        success: false,
        message: "User with this email is not registered",
      });

    // if user exist, verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    //if it matches, create an access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 43200 }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      access_token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateUserPassword(req: Request, res: Response) {
  const { userId } = req.params;
  const { oldPassword, password } = req.body;
  try {
    const user = await Admin.findById(userId);
    if (!user)
      return res.status(204).json({
        success: false,
        message: "User with this email is not registered",
      });

    // if user exist, verify password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    //hash new password and store in database
    const salt = await bcrypt.genSalt(10);
    const newHasedPassword = await bcrypt.hash(password, salt);

    user.password = newHasedPassword;

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.json({ message: error.message });
  }
}
