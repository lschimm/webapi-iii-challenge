const express = require("express");

// const logger = require("../server");
const router = express.Router();
const usersDB = require("./userDb.js");
const postsDB = require("../posts/postDb.js");

// const router = express.Router();
// const

// router.post("/", async (req, res) => {
//   const { name } = req.body;
//   console.log("<---=- USER -=----->\n", name);
//   try {
//     const db = await usersDB.insert(name);
//     res.status(200).json(db);
//   } catch (error) {
//     res.status(500).json({ message: "error adding" });
//   }
// });

router.post("/posting", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  
  console.log("<-=-=-REQ=-=-=>\n", name);
  console.log("<-=-=-REQ=-=-=>\n", req.body);
  usersDB
    .insert({ name })
    .then(db => {
      res.status(201).json(db);
    })
    .catch(err => {
      "error:", err;
    });
});

// router.post("/:id/posts", (req, res) => {
//   const dbInfo = req.body;
//   const { name } = req.body;

//   usersDB
//     .insert(dbInfo)
//     .then(db => {
//       if (!name) {
//         res.status(400).json({ message: "need id and message" });
//       } else {
//         res.status(201).json(db);
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ message: "dude, error." });
//     });
// });

// router.post("/:id/posts", (req, res) => {
//   let post = req.body;
//   const { id } = req.params;
//   post.postsDB = id;

//   postsDB
//     .insert(post)
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch(err => {
//       res.status(500).json({ message: "error adding post." });
//     });
// });

// get
router.get("/", async (req, res) => {
  try {
    const db = await usersDB.get(req.query);
    res.status(200).json(db);
  } catch (err) {
    res.status(500).json({ message: "Error from get" });
  }
});

// getById
router.get("/:id", validateUserId, async (req, res) => {
  try {
    let user = await usersDB.getById(req.user);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "error getting id" });
  }
});

// remove()
router.delete("/:id", (req, res) => {
  usersDB.remove(req.params.id).then(deleted => {
    if (deleted > 0) {
      res.status(200).json({ message: `deleted ${deleted} record` });
    } else {
      res.status(404).json({ message: "could not delete" });
    }
  });
});

// router.delete("/:id", async (req, res) => {
//   // const { id } = req.params;
//   try {
//     const id = await usersDB.remove(req.params.id);
//     if (count > 0) {
//       res.status(200).json({ message: "deleted" });
//     } else {
//       res.status(404).json({ message: "couldn't be deleted" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "error on delete" });
//   }
// });

router.put("/:id", (req, res) => {});

//custom middleware

// function validateUserId(req, res, next) {
//   if (req.params.id) {
//     next();
//   } else {
//     res.status(400).json("need info (id)");
//   }
// }

function validateUserId(req, res, next) {
  const id = req.params.id;

  usersDB
    .getById(id)
    .then(user => {
      console.log(user);
      if (!user) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "user could not be retrieved" });
    });
}

// function validateUser(req, res, next) {
//   if (req.body.name) {
//     next();
//   } else {
//     res.status(400).json("need info (name)");
//   }
// }

// function validateUser(req, res, next) {
//   const { name } = req.body;
//   if (Object.keys(req.body).length === 0) {
//     res.status(400).json({ message: "needs user data" });
//   } else if (!name) {
//     res.status(400).json({ message: "needs a name" });
//   } else {
//     user = req.body;
//     next();
//   }
// }

function validatePost(req, res, next) {
  if (req.body.text) {
    next();
  } else {
    res.status(400).json("need more info (body)");
  }
}

module.exports = router;
