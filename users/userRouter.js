const express = require("express");

// const logger = require("../server");
const router = express.Router();
const usersDB = require("./userDb.js");

// const router = express.Router();
// const

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

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

function validateUserId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json("need info (id)");
  }
}

function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json("need info (name)");
  }
}

function validatePost(req, res, next) {
  if (req.body.text) {
    next();
  } else {
    res.status(400).json("need more info (body)");
  }
}

module.exports = router;
