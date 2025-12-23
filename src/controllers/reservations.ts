import createUniqueCode from "../helpers/createCode";
import emailTemplate from "../helpers/emailTemplate";
import reminderTemplate from "../helpers/reminderTemplate";
import generateQR from "../helpers/generateQR";
import Reservation from "../model/Reservation";
import { Request, Response } from "express";
import { google } from "googleapis";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = process.env.REDIRECT_URI;
const EMAIL_USER = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(
	to: string,
	html: string,
	invitationCode: string,
	subject: string = "Invitation to our celebration"
) {
	try {
		const qrBuffer = await generateQR(invitationCode);
		const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

		// Convert QR image to Base64
		const qrBase64 = qrBuffer.toString("base64");

		// Create HTML email with embedded image
		const messageParts = [
			`From: '"Tope and Funmbi" <${EMAIL_USER}>'`,
			`To: ${to}`,
			`Subject: ${subject}`,
			"MIME-Version: 1.0",
			"Content-Type: multipart/related; boundary=boundary123",
			"",
			"--boundary123",
			"Content-Type: text/html; charset=UTF-8",
			"",
			html.replace("cid:qrcode", "data:image/png;base64," + qrBase64),
			"",
			"--boundary123--",
		];

		const message = messageParts.join("\n");

		// Gmail API requires Base64URL encoding
		const encodedMessage = Buffer.from(message)
			.toString("base64")
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "");

		const result = await gmail.users.messages.send({
			userId: "me",
			requestBody: {
				raw: encodedMessage,
			},
		});

		console.log("✅ Email sent via Gmail API:", result.data.id);
		return result.data;
	} catch (error) {
		console.error("❌ Error sending email:", error);
		throw error;
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
			sendMail(
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

export async function sendReminders(req: Request, res: Response) {
	try {
		const reservations = await Reservation.find({ status: "accepted" });

		if (reservations.length === 0) {
			return res
				.status(200)
				.json({ message: "No accepted reservations found to remind." });
		}

		let sentCount = 0;
		const errors: any[] = [];

		const emailPromises = reservations.map(async (reservation) => {
			if (reservation.email && reservation.invitationCode) {
				try {
					await sendMail(
						reservation.email,
						reminderTemplate(
							reservation.invitationCode,
							reservation.name,
							"qrcode"
						),
						reservation.invitationCode,
						"Event Reminder: Funmbi & Tope's Celebration"
					);
					sentCount++;
				} catch (err) {
					console.error(`Failed to send reminder to ${reservation.email}`, err);
					errors.push({ email: reservation.email, error: err });
				}
			}
		});

		await Promise.all(emailPromises);

		return res.status(200).json({
			message: "Reminders process completed",
			total: reservations.length,
			sent: sentCount,
			errors: errors.length > 0 ? errors : undefined,
		});
	} catch (error) {
		console.log("Error sending reminders", error);
		return res.status(500).json({ message: "Error Occured", error });
	}
}

export async function sendReminderToSingleUser(req: Request, res: Response) {
	try {
		const { reservationId } = req.params;
		const reservation = await Reservation.findById(reservationId);

		if (!reservation) {
			return res.status(404).json({ message: "Reservation not found" });
		}

		if (reservation.status !== "accepted" || !reservation.invitationCode) {
			return res.status(400).json({
				message: "Reservation is not accepted or missing invitation code",
			});
		}

		await sendMail(
			reservation.email,
			reminderTemplate(
				reservation.invitationCode,
				reservation.name,
				"qrcode"
			),
			reservation.invitationCode,
			"Event Reminder: Funmbi & Tope's Celebration"
		);

		return res.status(200).json({ message: "Reminder sent successfully" });
	} catch (error) {
		console.log("Error sending reminder", error);
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
