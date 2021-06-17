import User from "../models/userModel";
import validationFromatter from "../utils/validationFromatter";
import validation from "../models/validations/userValidation";
import { pick } from "lodash";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import util from "util";
import catchAsync from "express-async-handler";
import createError from "http-errors";

const readFile = util.promisify(fs.readFile);

const multerStorage = multer.memoryStorage();

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }

  cb(createError(400, "Not an image! Please upload only images."));
};

const upload = multer({ storage: multerStorage, fileFilter: filter });

const uplaodUserPhoto = upload.single("photo");

const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// Get All users
const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password -__v");

  res.status(200).json({
    status: "success",
    users,
  });
});

// Get User
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate("following", "_id name")
    .populate("followers", "_id name");

  if (!user) {
    return next(createError(400, "User not found"));
  }

  res.status(200).json({
    status: "success",
    user: pick(user, [
      "_id",
      "name",
      "email",
      "about",
      "photo",
      "following",
      "followers",
      "createdAt",
      "updatedAt",
    ]),
  });
});

// Update User
const updateUser = catchAsync(async (req, res, next) => {
  const filterBody = pick(req.body, ["name", "email", "about"]);

  const { error } = validation.updateUser(filterBody);

  if (error) {
    const errors = validationFromatter.joiError(error);
    return next(createError(400, "Validation Error", { errors }));
  }

  if (req.file) filterBody.photo = req.file.filename;

  const user = await User.findByIdAndUpdate(req.params.userId, filterBody, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(createError(400, "User not found"));

  res.status(200).json({
    status: "success",
    user: pick(user, [
      "_id",
      "name",
      "email",
      "about",
      "createdAt",
      "updatedAt",
    ]),
  });
});

// Delete User
const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);

  if (!user) {
    return next(createError(400, "User not found"));
  }

  res.json({
    status: "success",
    message: "User deleted successfully",
  });
});

// Add Following
const addFollowing = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.body.userId, {
    $push: { following: req.body.followId },
  });

  next();
});

// Add Follower
const addFollower = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.body.userId },
    },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name");

  res.status(200).json({
    status: "success",
    user: pick(user, [
      "_id",
      "name",
      "email",
      "about",
      "photo",
      "following",
      "followers",
      "createdAt",
      "updatedAt",
    ]),
  });
});

// Remove Following
const removeFollowing = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.body.userId, {
    $pull: { following: req.body.unfollowId },
  });

  next();
});

// Remove Follower
const removeFollower = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.body.userId },
    },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name");

  res.status(200).json({
    status: "success",
    user: pick(user, [
      "_id",
      "name",
      "email",
      "about",
      "photo",
      "following",
      "followers",
      "createdAt",
      "updatedAt",
    ]),
  });
});

// Get photo
const photo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  const userPhoto = await readFile(path.join("public/img/users", user.photo));

  res.set("Content-Type", "image/jpeg").send(userPhoto);
});

// Find Users to follow theme
const findUsers = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate("following", "_id name")
    .populate("followers", "_id name");

  if (!user) return next(createError(400, "User not found"));

  let following = user.following;
  following.push(user._id);

  const users = await User.find({ _id: { $nin: following } }).select(
    "_id name"
  );

  res.status(200).json({
    status: "success",
    users,
  });
});

export default {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uplaodUserPhoto,
  resizeUserPhoto,
  photo,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findUsers,
};
