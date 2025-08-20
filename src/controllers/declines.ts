import { Request, Response } from "express";
import Decline from "../model/Decline";

export async function getDeclines(req: Request, res: Response) {
  try {
    //pagination
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = (page - 1) * limit;
    const count = await Decline.countDocuments();

    const declines = await Decline.find().skip(skip).limit(limit);

    if (declines.length > 0)
      return res
        .status(200)
        .json({
          message: "Declines fetched successfully",
          data: declines,
          count,
        });
    else return res.status(204).json({ message: "There is no data" });
  } catch (error) {
    console.log("Error fetching this decline", error);
    return res.json({ message: "Error Occured", error });
  }
}

export async function sendDecline(req: Request, res: Response) {
  try {
    const { name, email, message } = req.body;
    const decline = await Decline.create({ name, email, message });
    if (decline)
      return res.status(201).json({ message: "Message sent successfully" });
    throw new Error("Something went wrong");
  } catch (error) {
    console.log("Error fetching this decline", error);
    return res.json({ message: "Error Occured", error });
  }
}
