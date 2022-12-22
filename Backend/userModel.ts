import mongoose, { Mongoose } from "mongoose";

interface NewUser {
  name: string;
  email: string;
  password: string;
}

interface NewUserData extends NewUser, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<NewUserData>("user", userModel);
