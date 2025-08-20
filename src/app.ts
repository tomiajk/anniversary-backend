import { config } from "dotenv";
import express from "express";
import cors from "cors";

import ReservationRoutes from "./routes/reservation-route";
import GalleryRoutes from "./routes/gallery-routes";
import AdminRoutes from "./routes/admin-routes";
import DeclineRoutes from "./routes/decline-routes";
import connectToDatabase from "./database/db";

config();
connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reservations", ReservationRoutes);
app.use("/api/declines", DeclineRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/gallery", GalleryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
