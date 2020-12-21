const express = require("express");
const dBModule = require("./dBModule");
const UserModel = require("./UserModel");
const MessageModel = require("./MessageModel");
const bcryptjs = require("bcryptjs");
const app = express();
const port = 3000;
var activeUser;
dBModule.connectToMongoose("forum");

const clientDir = __dirname + "\\client\\";

//USE SET
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(clientDir));

app.set("view engine", "ejs");

//GET
app.get("/", async (req, res) => {
  res.render("pages/index.ejs", {
    posts: await dBModule.findInDB(MessageModel),
  });
});

app.get("/login", (req, res) => {
  res.render("pages/login.ejs");
});

app.get("/register", (req, res) => {
  res.render("pages/register.ejs");
});

app.get("/createPost", (req, res) => {
  res.render("pages/createPost.ejs");
});

app.get("/post", async (req, res) => {
  let post = req.query.post;
  res.render("pages/post", {
    post: await dBModule.findInMongoose(MessageModel, post),
  });
});

//POST
app.post("/createUser", async (req, res) => {
  let usernameTaken = await dBModule.findInMongoose(
    UserModel,
    req.body.username
  );
  if (!usernameTaken) {
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    await dBModule.saveToMongoose(
      createUser(req.body.username, hashedPassword)
    );
  }
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  let username = await dBModule.findInMongoose(UserModel, req.body.username);
  if (username && bcryptjs.compare(req.body.password, username.password)) {
    console.log("hejsan");
    activeUser = req.body.username;
  }
  res.redirect("/");
});

app.post("/createPost", async (req, res) => {
  dBModule.saveToMongoose(
    createMessage(activeUser, req.body.title, req.body.message)
  );
  res.redirect("/");
});

//LISTEN
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

function createUser(inName, inPassword) {
  let user = new UserModel({
    name: inName,
    password: inPassword,
  });
  return user;
}

function createMessage(inUser, inTitle, inMessage) {
  let message = new MessageModel({
    user: inUser,
    title: inTitle,
    message: inMessage,
  });
  return message;
}
