import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//file system in node.js "fs". It helps to read/write/remove the file sync or asynchronously.
//here we will need a file path from local storage.
//fs.unlink(path) - delete file from fileSystem. ie. we can remove file once it is successfully uploaded on cloudinary.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    console.log("File is uploaded on cloudinary: ", response.url);
    console.log(response);
    return response;
  } catch (error) {
    //if file is not successfully uploaded, then go in catch block
    //in case if there is any mistake in localFilePath, still we go in catch block
    //It is sure that the file is at least on our local server, otherwise we would not have localFilePath.
    //First of all, we should delete the file from local server, otherwise it might get corrupted or malicious.
    fs.unlink(localFilePath); //remove the locally saved temporary file
    // as the upload operation got failed.
    return null;
  }
};

export { uploadOnCloudinary };
