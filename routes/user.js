const { Router } = require("express");
const UserModel = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = await UserModel.findOne({ email });

    const token = await UserModel.matchPasswordAndGenerateToken(
      email,
      password
    );
    // console.log("Token", token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error);
    res.render("signin", { error: "Incorrect email Or password " });
  }
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
