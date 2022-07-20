import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
