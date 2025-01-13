const express = require("express");
const { handleAllUrl, handleShortUrl, handlePostUrl } = require("../controllers/url");
const router = express.Router();

router.get("/", handleAllUrl);
router.get("/:shortUrl", handleShortUrl);
router.post("/", handlePostUrl);

module.exports = router;