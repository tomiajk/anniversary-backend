import * as mongoose from "mongoose";

export interface DeclineDocument extends mongoose.Document {
  name: string;
  email: string;
  message?: string;
}

const DeclineSchema = new mongoose.Schema<DeclineDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<DeclineDocument>("declines", DeclineSchema);
