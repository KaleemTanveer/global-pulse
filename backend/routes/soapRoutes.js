const express = require("express");
const router = express.Router();

const { convertNumber } = require("../controllers/soapController");

router.get("/number", convertNumber);

module.exports = router;