import createUniqueCode from "../helpers/createCode";
import emailTemplate from "../helpers/emailTemplate";
import Reservation from "../model/Reservation";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function getReservations(req: Request, res: Response) {
  try {
    //sorting
    const sortBy: string = req?.query?.sortBy
      ? (req.query.sortBy as string)
      : "numOfGuests";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const sortObj: Record<string, 1 | -1> = {};
    sortObj[sortBy] = sortOrder;

    //pagination
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = (page - 1) * limit;
    const count = await Reservation.countDocuments();

    const reservations = await Reservation.find()
      .skip(skip)
      .limit(limit)
      .sort(sortObj);

    console.log(reservations);

    if (reservations.length > 0) {
      return res.status(200).json({
        message: "Reservations fetched successfully",
        data: { reservations },
        count,
      });
    } else
      return res.status(204).json({ message: "There are no reservations yet" });
  } catch (error) {
    console.log("Error getting all reservations", error);
    return res.json({ message: "Error Occured", error });
  }
}

export async function getReservationByCode(req: Request, res: Response) {
  try {
    const { invitationCode } = req.params;
    const reservation = await Reservation.findOne({ invitationCode });
    if (reservation)
      return res
        .status(200)
        .json({ message: "User fetched successfully", data: reservation });
    else
      return res
        .status(204)
        .json({ message: "This invitation code does not exist" });
  } catch (error) {
    console.log("Error fetching this reservation", error);
    return res.json({ message: "Error Occured", error });
  }
}

export async function makeReservation(req: Request, res: Response) {
  try {
    const { name, email, phoneNumber, message, numOfGuests, restrictions } =
      req.body;

    const existing = await Reservation.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ message: "This user has already requested a reservation" });

    const newReservation = await Reservation.create({
      name,
      email,
      phoneNumber,
      message,
      restrictions,
      numOfGuests: Number(numOfGuests),
      status: "pending",
    });

    if (newReservation)
      return res
        .status(201)
        .json({ message: "Reservation created successfully" });
    else
      return res
        .status(401)
        .json({ message: "There was an issue booking your reservation" });
  } catch (error) {
    console.log("Error fetching this reservation", error);
    return res.status(500).json({ message: "Error Occured", error });
  }
}

export async function acceptReservation(req: Request, res: Response) {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findById(reservationId);
    const invitaionCode = createUniqueCode();

    if (
      reservation.status === "accepted" &&
      reservation.invitationCode !== null
    )
      return res
        .status(400)
        .json({ message: "This user already has an invitation code" });

    if (reservation) {
      reservation.invitationCode = invitaionCode;
      reservation.status = "accepted";
      await reservation.save();

      //send mail
      await transporter.sendMail({
        to: reservation.email,
        subject: "Invitation to our celebration",
        html: emailTemplate(invitaionCode, reservation.name, "testing"),
      });

      res.status(200).json({ message: "Reservation accepted successfully" });
    } else return res.status(400);
  } catch (error) {
    console.log("Error fetching this reservation", error);
    return res.json({ message: "Error Occured", error });
  }
}

export async function deleteReservation(req: Request, res: Response) {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findByIdAndDelete(reservationId);

    if (reservation)
      return res.status(200).json({ reservation: "successfully deleted" });
    else
      return res.status(400).json({
        message: "Reservation with this id does not exist in the database",
      });
  } catch (error) {
    console.log("Error fetching this reservation", error);
    return res.json({ message: "Error Occured", error });
  }
}
