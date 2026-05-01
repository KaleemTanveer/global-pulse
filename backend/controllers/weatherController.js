const axios = require("axios");

exports.getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const geoRes = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    const location = geoRes.data.results?.[0];

    if (!location) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude } = location;

    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    res.json(weatherRes.data.current_weather);
  } catch (error) {
    res.status(500).json({ error: "Weather API failed" });
  }
};