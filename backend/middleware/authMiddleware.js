const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  try {
    // 🍪 Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};