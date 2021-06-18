import Post from "../models/postModel";
import User from "../models/userModel";
import { assign, pick } from "lodash";
import sharp from "sharp";
import fs from "fs";
import formidable from "formidable";
import path from "path";
import util from "util";
import catchAsync from "express-async-handler";
import createError from "http-errors";
import validationFromatter from "../utils/validationFromatter";
import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

const readFile = util.promisify(fs.readFile);

// Create Post
const create = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(
    req,
    catchAsync(async (err, fields, files) => {
      if (err) {
        return next(createError(400, "Image could not be uploaded"));
      }

      const schema = Joi.object().keys({
        text: Joi.string().trim().required(),
      });

      const { error } = schema.validate(fields);

      if (error) {
        const errors = validationFromatter.joiError(error);
        return next(createError(400, "Validation Error", { errors }));
      }

      const filterBody = assign(pick(fields, ["text"]), {
        postedBy: req.user.id,
      });

      let post = new Post(filterBody);

      if (files.photo) {
        if (!files.photo.type.startsWith("image")) {
          return next(
            createError(400, "Not an image! Please upload only images.")
          );
        }

        files.photo.filename = `post-${post._id}-${Date.now()}.jpeg`;

        const buffer = await readFile(files.photo.path);

        await sharp(buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/posts/${files.photo.filename}`);

        post.photo = files.photo.filename;
      }

      post = await post
        .save()
        .then((post) => post.populate("postedBy", "_id name").execPopulate());

      res.status(201).json({
        status: "success",
        post: post,
      });
    })
  );
};

// List News Feed Posts
const listNewsFeed = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate("following", "_id name")
    .populate("followers", "_id name");

  if (!user) {
    return next(createError(400, "User not found"));
  }

  let following = user.following;
  following.push(user._id);

  // Get Posts
  const posts = await Post.find({ postedBy: { $in: following } })
    .populate("postedBy", "_id name")
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    posts,
  });
});

const postByID = catchAsync(async (req, res, next, postId) => {
  const post = await Post.findById(postId).populate("postedBy", "_id name");

  if (!post) {
    return next(createError(400, "Post Not Found!"));
  }

  req.post = post;
  next();
});

// List Posts By user
const listByUser = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ postedBy: req.params.userId })
    .populate("postedBy", "_id name")
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    posts,
  });
});

// Delete post
const deletePost = catchAsync(async (req, res, next) => {
  const post = req.post;
  const deletedPost = await post.remove();

  res.status(200).json({
    status: "success",
    post: deletedPost,
  });
});

// Check user Poster
const isPoster = (req, res, next) => {
  const poster = req.post && req.user && req.post.postedBy._id == req.user.id;

  if (!poster) {
    return next(createError(401, "User is not authorized"));
  }

  next();
};

// Like Post
const like = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user.id } },
    { new: true }
  )
    .populate("postedBy", "_id name")
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name");

  res.status(200).json({
    status: "success",
    post,
  });
});

// UnLike Post
const unlike = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user.id } },
    { new: true }
  )
    .populate("postedBy", "_id name")
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name");

  res.status(200).json({
    status: "success",
    post,
  });
});

// Comment Post
const comment = catchAsync(async (req, res, next) => {
  const comment = req.body.comment;
  comment.postedBy = req.user.id;

  const schema = Joi.object({
    text: Joi.string().trim().required(),
    postedBy: Joi.objectId().required(),
  });

  const { error } = schema.validate(comment);

  if (error) {
    const errors = validationFromatter.joiError(error);
    return next(createError(400, "Validation Error", { errors }));
  }

  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: pick(comment, ["text", "postedBy"]) } },
    { new: true }
  )
    .populate("postedBy", "_id name")
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name");

  res.status(200).json({
    status: "success",
    post,
  });
});

// UnComment Post
const uncomment = catchAsync(async (req, res, next) => {
  const comment = req.body.comment;

  const post = await Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
  )
    .populate("postedBy", "_id name")
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name");

  res.status(200).json({
    status: "success",
    post,
  });
});

// Get Photo
const photo = catchAsync(async (req, res, next) => {
  const postPhoto = await readFile(
    path.join("public/img/posts", req.post.photo)
  );

  return res.set("Content-Type", "image/jpeg").send(postPhoto);
});

export default {
  create,
  listNewsFeed,
  listByUser,
  deletePost,
  comment,
  uncomment,
  like,
  unlike,
  isPoster,
  postByID,
  photo,
};
