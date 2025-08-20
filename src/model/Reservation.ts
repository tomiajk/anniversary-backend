import * as mongoose from "mongoose";

export type StatusType = "pending" | "accepted" | "declined";

export interface ReservationDocument extends mongoose.Document {
  name: string;
  email: string;
  phoneNumber?: string;
  status?: StatusType;
  numOfGuests?: number;
  message?: string;
  restrictions?: string;
  invitationCode?: string;
}

const ReservationSchema = new mongoose.Schema<ReservationDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "accepted", " declined"],
      required: true,
    },
    phoneNumber: { type: String },
    numOfGuests: { type: Number },
    message: { type: String },
    restrictions: { type: String },
    invitationCode: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default mongoose.model<ReservationDocument>(
  "reservations",
  ReservationSchema
);
