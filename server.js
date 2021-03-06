const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const knex = require("knex");
const app = express();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    // connectionString: process.env.DATABASE_URL,
    // ssl: true,
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "01790199194",
    database: "smart-brain",
  },
});

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Working...");
});

app.post("/signin", signin.handleSignin(db, bcrypt)); //complex way

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
}); //easy way

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  // console.log("a");
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
// app.listen(3000, () => {
//   console.log("Running on Port 3000");
// });
