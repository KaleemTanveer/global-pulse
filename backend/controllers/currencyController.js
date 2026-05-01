const axios = require("axios");

exports.convertCurrency = async (req, res) => {
  try {
    const { amount = 1, from = "USD", to = "PKR" } = req.query;

    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${from}`
    );

    const rate = response.data.rates[to];

    if (!rate) {
      return res.status(400).json({ error: "Invalid currency code" });
    }

    const convertedAmount = amount * rate * 1.15;

    res.json({
      from,
      to,
      amount,
      rate,
      convertedAmount,
    });
  } catch (error) {
    res.status(500).json({ error: "Currency conversion failed" });
  }
};