const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    // ✅ Get token from cookie OR header
    const token =
      req.cookies?.token || // from cookie
      req.headers.authorization?.split(" ")[1]; // from Bearer token

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // ✅ same secret as login
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "testsecret"
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};