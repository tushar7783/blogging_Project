require("dotenv/config");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const userRoutes = require("./routes/user");
// connection
const mongoose = require("mongoose");
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

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port :${PORT}`);
});