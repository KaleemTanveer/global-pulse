const axios = require("axios");

exports.getISS = async (req, res) => {
  try {
    const response = await axios.get(
      "http://api.open-notify.org/iss-now.json"
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "ISS API failed" });
  }
};