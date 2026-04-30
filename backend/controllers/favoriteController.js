const Favorite = require("../models/Favorite");
// GET favorites
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.findAll({
      where: { UserId: userId },
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

// ADD favorite
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { countryCode } = req.body;

    const favorite = await Favorite.create({
      UserId: userId,
      countryCode: countryCode,
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
};