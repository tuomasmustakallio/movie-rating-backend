var express = require("express");
var router = express.Router();

const reviews = [];

router.post("/reviews", (req, res) => {
  const review = req.body;
  reviews.push(review);
  res.send("Review added successfully");
});

router.get("/reviews", (req, res) => {
  res.json(reviews);
});

module.exports = router;
