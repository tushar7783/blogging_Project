require("dotenv/config");
const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const BlogModel = require("./models/blog");

// connection
const mongoose = require("mongoose");
const {
  checkForAuthenticationOfToken,
} = require("./middleware/authentication");
mongoose
  .connect("mongodb://127.0.0.1:27017/blogging")
  .then(() => {
    console.log("connect mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve("./public"))); //it is used to serve it as static photos basically it is a middleware
// app.use(express.static(path.resolve("./public"))); //it is used to serve it as static photos basically it is a middleware

app.use(cookieParser());
app.use(checkForAuthenticationOfToken("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allblogs = await BlogModel.find({}).sort("createdAt");
  res.render("home", { user: req.user, blogs: allblogs });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port :${PORT}, ${Date.now()}`);
});
