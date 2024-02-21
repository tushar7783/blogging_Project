require("dotenv/config");
const { Schema, model } = require("mongoose");
const commentSchema = new Schema(
  {
    content: {
      type: String,
      reuired: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blogs",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const CommentModel = model("comment", commentSchema);

module.exports = CommentModel;
