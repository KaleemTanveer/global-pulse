const axios = require("axios");

exports.getRates = async (req, res) => {
  try {
    const base = req.query.base || "USD";

    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${base}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Currency API failed" });
  }
};