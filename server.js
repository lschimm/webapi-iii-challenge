const express = require("express");

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

//middleware here
function logger(req, res, next) {
  console.log(`${req.method} to ${req.path} and ${Date.now}()`);
  next();
}

server.get("/api", (req, res) => {
  res.send(`<h2>Server up? :B</h2>`);
});

//custom middleware

server.use("/userRoute", userRouter);
server.use("/postRoute", postRouter);

//global? middleware here
server.use(logger);
server.use(express.json());

module.exports = server;
