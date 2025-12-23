import express from "express";
import {
  getReservations,
  getReservationByCode,
  makeReservation,
  acceptReservation,
  deleteReservation,
  checkInGuest,
  sendReminders,
  sendReminderToSingleUser,
} from "../controllers/reservations";
import authenticate from "../middlewares/authentication";

const router = express.Router();

// admin should be able to search for all reservations
router.get("/get", authenticate, getReservations);

// search for a particular reservation using iinvitaton code
router.get("/reservation/:invitationCode", authenticate, getReservationByCode);

// admin should be able to edit(delete) a reservation
router.delete("/delete/:reservationId", authenticate, deleteReservation);

// admin should be able to accept a reservation request
router.put("/accept/:reservationId", authenticate, acceptReservation);

// check in
router.put("/checkin/:invitationCode", authenticate, checkInGuest);

// admin should be able to send reminders to all accepted guests
router.post("/remind-all", authenticate, sendReminders);

// admin should be able to send reminder to a single user
router.post("/remind/:reservationId", authenticate, sendReminderToSingleUser);

// guest should be able to submit a reservation
router.post("/book", makeReservation);

export default router;
