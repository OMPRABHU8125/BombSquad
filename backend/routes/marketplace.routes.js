const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { getNearbyMarketplaces } = require("../controllers/marketplace.controller");

router.post("/nearby", auth, getNearbyMarketplaces);

module.exports = router;
