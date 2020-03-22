const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const dbUser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;

const app = express();

app.use(cors());
const localUri = "mongodb://localhost/recipesAPI";
const mongodbUri = `mongodb+srv://${dbUser}:${dbPassword}@recipes-4rrlu.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const db = mongoose.connect(mongodbUri);
const port = process.env.PORT || 3001;
const User = require("./models/userModel");
const Recipe = require("./models/recipeModel");

const recipesRouter = require("./routes/recipesRouter")(Recipe);
const userRouter = require("./routes/usersRouter")(User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", recipesRouter);
app.use("/api", userRouter);
app.locals.moment = require("moment");

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.get("/env", (req, res) => {
  const { PROGRAM_NAME } = process.env;
  res.send(PROGRAM_NAME);
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
