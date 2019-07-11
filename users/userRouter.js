const express = require("express");

const router = express.Router();
const usersDB = require("./userDb.js");

// const router = express.Router();
// const

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const db = await usersDB.get(req.query);
    res.status(200).json(db);
  } catch (err) {
    res.status(500).json({ message: "Error from get" });
  }
});

router.get("/:id", (req, res) => {
  const db = DB.getById(req.user);
  try {
    let user = Users.getById(req.user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "error2" });
  }
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
