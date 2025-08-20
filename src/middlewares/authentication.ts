import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log(token);

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Access denied. Pass a valid token.",
    });

  //decode the token
  const decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedInfo)
    return res.status(401).json({
      success: false,
      message: "Error while verifying token",
    });

  next();
}
