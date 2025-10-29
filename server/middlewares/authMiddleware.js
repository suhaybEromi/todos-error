import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return res.status(401).json({ message: "Access denied. No token." });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please refresh." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token." });
    }

    console.error(err);
    return res.status(403).json({ message: "Token verification failed." });
  }
};

export default authenticate;
