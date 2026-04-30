const express = require("express");
const router = express.Router();
const { getISS } = require("../controllers/issController");

router.get("/", getISS);

module.exports = router;