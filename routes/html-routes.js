const express = require('express');
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/members", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

module.exports = router;
