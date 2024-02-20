const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const BlogModel = require("../models/blog");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  res.render("addblog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const { title, body } = req.body;

  const blog = await BlogModel.create({
    body: body,
    title: title,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
