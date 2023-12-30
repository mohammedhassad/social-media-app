import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },

    photo: String,

    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        text: {
          type: String,
          required: [true, "Comment is required"],
          trim: true,
        },
        createdAt: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
