var express = require("express");
var router = express.Router();

const movies = [];

router.post("/movies", (req, res) => {
  const movie = req.body;
  movies.push(movie);
  res.send("Movie added successfully");
});

router.get("/movies", (req, res) => {
  res.json(movies);
});

module.exports = router;
