import express from "express";
import { usersRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log("server ready");
});

app.use("/users", usersRouter);
