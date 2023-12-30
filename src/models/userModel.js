import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      lowercase: true,
      minLength: [3, "Password must be at least 3 characters."],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
    },
    about: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters."],
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

export default mongoose.model("User", userSchema);
