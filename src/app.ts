require("dotenv").config();
import express from "express";
import connectToDatabase from "./database/db";
import ReservationRoutes from "./routes/reservation-route";
import DeclineRoutes from "./routes/decline-routes";
import AdminRoutes from "./routes/admin-routes";
import GalleryRoutes from "./routes/gallery-routes";

const app = express();

//connect to database
connectToDatabase();

// use middleware to parse json
app.use(express.json());

// routes
app.use("/anniversary/api/reservations", ReservationRoutes);
app.use("/anniversary/api/declines", DeclineRoutes);
app.use("/anniversary/api/admin", AdminRoutes);
app.use("/anniversary/api/gallery", GalleryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
