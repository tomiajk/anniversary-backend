import createUniqueCode from "../helpers/createCode";
import emailTemplate from "../helpers/emailTemplate";
import generateQR from "../helpers/generateQR";
import Reservation from "../model/Reservation";
import { Request, Response } from "express";

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail(
	recepient: string,
	html: string,
	invitaionCode: string
) {
	try {
		// create qr buffer
		const qrBuffer = await generateQR(invitaionCode);
		await resend.emails.send({
			from: "Invitation to our Celebration <onboarding@resend.dev>",
			to: recepient,
			subject: "Invitaion to our Celebration",
			html: html,
			attachments: [
				{
					filename: "qrcode.png",
					content: qrBuffer,
					contentId: "qrcode",
				},
			],
		});
		console.log("✅ Email sent successfully!");
	} catch (error) {
		console.error("❌ Error sending email:", error);
	}
}
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
		return res.status(500).json({ message: "Error Occured", error });
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
		return res.status(500).json({ message: "Error Occured", error });
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
			isPresent: false,
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
			await sendMail(
				reservation.email,
				emailTemplate(invitaionCode, reservation.name, "qrcode"),
				invitaionCode
			);

			res.status(200).json({ message: "Reservation accepted successfully" });
		} else return res.status(400);
	} catch (error) {
		console.log("Error fetching this reservation", error);
		return res.status(500).json({ message: "Error Occured", error });
	}
}

export async function checkInGuest(req: Request, res: Response) {
	try {
		const { invitationCode } = req.params;
		const reservation = await Reservation.findOne({ invitationCode });

		if (!invitationCode)
			return res.status(400).json({ message: "Pass in a valid code" });

		reservation.isPresent = true;
		await reservation.save();

		return res
			.status(200)
			.json({ message: "Guest checked in successfully", data: reservation });
	} catch (error) {
		console.log("Error fetching this reservation", error);
		return res.status(500).json({ message: "Error Occured", error });
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
		return res.status(500).json({ message: "Error Occured", error });
	}
}
