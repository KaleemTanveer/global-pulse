const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getFavorites,
  addFavorite,
} = require("../controllers/favoriteController");

// protected routes
router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, addFavorite);

module.exports = router;