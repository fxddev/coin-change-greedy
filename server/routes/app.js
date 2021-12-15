const express = require("express");
const appController = require('../controllers/app');

const router = express.Router();

router.get("/coin-change", appController.coinChange);

module.exports = router;