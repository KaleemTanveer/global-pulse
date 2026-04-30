const express = require("express");
const router = express.Router();
const {
  getCountries,
  getCountryByCode,
} = require("../controllers/countryController");

router.get("/", getCountries);
router.get("/:code", getCountryByCode);

module.exports = router;