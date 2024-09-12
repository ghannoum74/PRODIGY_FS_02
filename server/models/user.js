const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z ]{3,}$/,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      match: /^[a-zA-Z ]{3,}$/,
      minlength: 2,
      maxlength: 20,
      required: true,
    },

    birthday: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//***************************static signup method****************************//
UserSchema.statics.signup = async function (
  firstName,
  lastName,
  birthday,
  email,
  password,
  gender,
  isAdmin
) {
  if (!firstName || !lastName || !birthday || !email || !password) {
    throw Error("All field must be filled");
  }
  const existEmail = await this.findOne({ email });
  if (existEmail) {
    throw Error("Email already in use, please try another one or login...");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    birthday,
    email,
    password: hash,
    gender,
    isAdmin,
  });

  return user;
};

//***************************static login method****************************//
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email, Please enter a valid one!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password, Please enter a the correct password!");
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

const validationNewUser = joi.object({
  firstName: joi.string().trim().min(3).max(20).required(),
  lastName: joi.string().trim().min(2).max(20).required(),
  birthday: joi.string().required(),
  email: joi.string().email().required().trim(),
  password: joi.string().trim().required(),
  gender: joi.string().default(null),
  isAdmin: joi.boolean().default(false),
});

const validationOldUser = joi.object({
  email: joi.string().trim().required().email(),
  password: joi.string().trim().required(),
  isAdmin: joi.boolean().default(false),
});

module.exports = {
  User,
  validationNewUser,
  validationOldUser,
};
