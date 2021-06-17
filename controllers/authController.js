import jwt from "jsonwebtoken";
import { pick } from "lodash";
import User from "../models/userModel";
import validation from "../models/validations/authValidation";
import validationFromatter from "../utils/validationFromatter";
import expressJwt from "express-jwt";
import config from "../config/config";
import catchAsync from "express-async-handler";
import createError from "http-errors";

const signToken = (id) => {
  return jwt.sign({ id: id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const { error } = validation.signup(req.body);

  if (error) {
    const errors = validationFromatter.joiError(error);

    return next(createError(400, "Validation Error", { errors }));
  }

  await User.create(pick(req.body, ["name", "email", "password"]));

  // send response
  res.status(201).json({
    status: "success",
    message: "User signup  successfully",
  });
});

const signin = catchAsync(async (req, res, next) => {
  const { error } = validation.signin(req.body);

  if (error) {
    const errors = validationFromatter.joiError(error);

    return next(createError(400, "Validation Error", { errors }));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await user.comparePassword(req.body.password))) {
    return next(createError(401, "Incorrect email or password"));
  }

  const token = signToken(user._id);

  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + config.jwtCookieExpiresIn * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  // if (config.env === "production") cookieOptions.secure = true;

  // res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token: token,
    user: pick(user, ["_id", "name", "email", "createdAt", "updatedAt"]),
  });
});

const signout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  return res.status(200).json({
    status: "success",
    message: "signed out successfully",
  });
});

const protect = expressJwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
});

export default { signin, signout, signup, protect };
