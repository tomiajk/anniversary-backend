import * as mongoose from "mongoose";

export interface PictureDocument {
  url: string;
  publicId: string;
  category: string;
  status: string;
}

const PictureSchema = new mongoose.Schema<PictureDocument>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    category: { type: String, required: true },
    // status: { type: String, enum: ["approved", " "], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<PictureDocument>("gallery", PictureSchema);
