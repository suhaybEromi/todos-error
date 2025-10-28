import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    if (!accessToken)
      return res
        .status(401)
        .json({ message: "Access denied. No token found." });

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Token invalid or expired" });

      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticate;
