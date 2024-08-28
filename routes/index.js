const express = require("express");
const router = express.Router();
const newsController = require("../controller");

// Define your routes here
// router.get('/v1/news', fetchNews);

router.get("/news", newsController.getNews);

module.exports = router;
