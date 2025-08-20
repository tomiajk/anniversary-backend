import * as mongoose from "mongoose";

export interface AdminDocument extends mongoose.Document {
  email: string;
  password: string;
}

const AdminSchema = new mongoose.Schema<AdminDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<AdminDocument>("admin", AdminSchema);
