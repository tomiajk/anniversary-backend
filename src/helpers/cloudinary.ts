// const cloudinary = require("cloudinary").v2;
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { Path } from "mongoose";

// Configure your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to a specific collection
export async function uploadToCollection(
  imagePath: Path,
  collectionName: string
) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: collectionName,
    });
    // delete from local storage
    fs.unlinkSync(imagePath);
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Upload to cloudinary storage failed");
  }
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Deleting from cloudinary storage failed");
  }
}

export async function addImagesToCloudinary(imageArray) {
  let pictures = [];

  if (imageArray.length > 0) {
    for (let i = 0; i < imageArray.length; i++) {
      const result = await uploadToCollection(imageArray[i].path, "gallery");
      pictures.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }
  } else throw new Error("Image Array is empty");

  return pictures;
}

export async function deleteImagesFromCloudinary(imageArray) {
  if (imageArray.length > 0) {
    for (let i = 0; i < imageArray.length; i++) {
      await deleteFromCloudinary(imageArray[i].publicId);
    }
  } else throw new Error("Image Array is empty");
}
