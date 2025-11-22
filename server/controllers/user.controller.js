import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createAccessToken = user =>
  jwt.sign({ id: user.id || user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

const createRefreshToken = user =>
  jwt.sign({ id: user.id || user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

const oauthSuccess = (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/signin?error=oauth-no-user`,
      );
    }

    const accessToken = createAccessToken(req.user);
    const refreshToken = createRefreshToken(req.user);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
  } catch (err) {
    console.log(err);
    return res.redirect(
      `${process.env.FRONTEND_URL}/signin?error=oauth-server`,
    );
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email already exists. Please sign in." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Signed in successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token found" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = createAccessToken({ id: decoded.id });

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Token refreshed successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

const profile = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { signup, signin, refresh, profile, logout, oauthSuccess };
