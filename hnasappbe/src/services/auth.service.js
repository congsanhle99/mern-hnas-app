import createHttpError from "http-errors";
import validator from "validator";
import UserModel from "../models/userModel.js";

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  // check if field empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields!");
  }

  // check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 32,
    })
  ) {
    throw createHttpError.BadRequest("Make sure name is between 2 and 32 characters!");
  }

  // check status length
  if (status && status.length > 64) {
    throw createHttpError.BadRequest("Make sure your status is less than 64 characters!");
  }

  // check email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Make sure provide a valid email address!");
  }

  // check user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict("User already exist!");
  }

  // check password length
  if (
    !validator.isLength(password, {
      min: 8,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest("Make sure password is between 8 and 128 characters!");
  }

  // hash password using bcrypt => in user model

  // add user to DB
  const user = await new UserModel({
    name,
    email,
    picture: picture || process.env.DEFAULT_PICTURE,
    status: status || process.env.DEFAULT_STATUS,
    password,
  }).save();

  return user;
};
