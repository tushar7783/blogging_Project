const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const BlogModel = require("../models/blog");
const CommentModel = require("../models/comment");
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

router.get("/:id", async (req, res) => {
  const blog = await BlogModel.findById(req.params.id).populate("createdBy");
  const comments = await CommentModel.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log(blog);
  console.log(
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    comments
  );

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
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

// comments in the post
router.post("/comment/:blogId", async (req, res) => {
  // const content = req.body;
  const comment = await CommentModel.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
