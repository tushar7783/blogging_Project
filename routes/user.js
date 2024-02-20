const { Router } = require("express");
const UserModel = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // const user = await UserModel.findOne({ email });

  const user = await UserModel.matchPassword(email, password);
  console.log("user", user);
  res.redirect("/");
});
router.post("/signup", async (req, res) => {
  const { Name, email, password } = req.body;
  await UserModel.create({
    Name,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = router;
