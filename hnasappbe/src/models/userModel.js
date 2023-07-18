import mongoose from "mongoose";
import validator from "validator";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address!"],
      unique: [true, "This email address already exist!"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address!"],
    },

    picture: {
      type: String,
      default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
      type: String,
      default: "Hey there! I am using HnasApp!",
    },
    password: {
      type: String,
      required: [true, "Please provide your password!"],
      minLength: [8, "Please make sure your password is atleast 8 characters!"],
    },
  },

  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
