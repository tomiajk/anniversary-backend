import { Request, Response } from "express";
import Picture from "../model/Picture";
import {
	deleteFromCloudinary,
	uploadToCollection,
} from "../helpers/cloudinary";

export async function getPictures(req: Request, res: Response) {
	try {
		const sortBy: string = req?.query?.sortBy
			? (req.query.sortBy as string)
			: "createdAt";
		const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
		const sortObj: Record<string, 1 | -1> = {};
		sortObj[sortBy] = sortOrder;

		//pagination
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 20;
		const skip = (page - 1) * limit;
		const count = await Picture.countDocuments();

		const gallery = await Picture.find().skip(skip).limit(limit).sort(sortObj);

		if (gallery.length > 0) {
			return res.status(200).json({
				message: "gallery fetched successfully",
				data: { gallery },
				count,
			});
		} else return res.status(204).json({ message: "There are no gallery yet" });
	} catch (error) {
		console.log("Error getting all gallery", error);
		return res.status(500).json({ message: "Error Occured", error });
	}
}

export async function postPicture(req: Request, res: Response) {
	const pictures = req.files;
	const category = req.body?.category ? req.body.category : "others";
	const collection = `anniversary-${category}`;

	if (!pictures || (pictures.length as number) < 1)
		return res.status(400).json({ message: "no image uploaded" });

	try {
		// for all picture in the array, create a data entry and store in cloudinary
		for (let i = 0; i < (pictures.length as number); i++) {
			// upload first to cloudinary
			const { secure_url, public_id } = await uploadToCollection(
				pictures[i].path,
				collection
			);
			if (!secure_url && !public_id)
				throw new Error("Image was not uploaded successfully");

			// if successful, store url in database
			const newPicture = await Picture.create({
				url: secure_url,
				publicId: public_id,
				category,
			});

			if (!newPicture)
				throw new Error("Image could not be stored in the datebase");
		}
		return res.status(201).json({ message: "Pictures uploaded successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: `An error occured- ${error}` });
	}
}

export async function deletePicture(req: Request, res: Response) {
	const { pictureId } = req.params;

	try {
		const picture = await Picture.findById(pictureId);

		if (picture) {
			// delete first from cloudinary
			await deleteFromCloudinary(picture.publicId);

			// then delete from database
			const deleted = await Picture.findByIdAndDelete(pictureId);

			if (deleted)
				return res
					.status(200)
					.json({ message: "Picture deleted successfully" });
			else
				throw new Error("An error occured while tryinh to delete this picture");
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: `An error occured- ${error}` });
	}
}
