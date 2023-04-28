var express = require("express");
var router = express.Router();

// Mock database
const users = [];

// Register user endpoint
router.post("/users", (req, res) => {
  const { username, password, email } = req.body;
  const user = {
    id: users.length + 1,
    username,
    password,
    email,
  };
  users.push(user);
  res.status(201).send(user);
});

// Login endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    res.status(401).send("Invalid credentials");
  } else {
    const token = Math.random().toString(36).slice(2);
    user.token = token;
    res.status(200).send({ token });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  const { token } = req.body;
  const user = users.find((u) => u.token === token);
  if (!user) {
    res.status(401).send("Invalid token");
  } else {
    delete user.token;
    res.status(200).send("Logged out successfully");
  }
});

// Get user profile endpoint
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
});

// Update user profile endpoint
router.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    res.status(404).send("User not found");
  } else {
    const { username, password, email } = req.body;
    if (username) user.username = username;
    if (password) user.password = password;
    if (email) user.email = email;
    res.status(200).send(user);
  }
});

module.exports = router;
