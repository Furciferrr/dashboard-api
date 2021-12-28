import express from "express";

const usersRouter = express.Router();

usersRouter.get("/login", (req, res) => {
  res.send("login");
});

usersRouter.post("/register", (req, res) => {
  res.send("register");
});

export { usersRouter };
