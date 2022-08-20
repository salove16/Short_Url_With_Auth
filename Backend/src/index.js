const express = require("express");
require("dotenv").config();
const connect = require("./config/db");
const userController=require("./controllers/user.Controller")
const UrlRouter = require("./controllers/url.coontroller");

const {
    register,
    login,
    generateToken,
  } = require("./controllers/auth.controller");

const cors = require("cors");

const app = express();

app.use(express.json());



app.use(cors());

app.use("/users", userController);

app.post("/signup", register);

app.post("/login", login);

app.use("/url", UrlRouter);




app.listen(process.env.PORT || 4000, async () => {
  try {
    await connect();
    console.log("Listening to port 4000");
  } catch (err) {
    console.log(err);
  }
});
