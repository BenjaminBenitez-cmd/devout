import fs from "fs";
import cloudinary from "../../utils/cloudinary";

export const uploadToCloudinary = (localFilePath) => {
  return new Promise((resolve, reject) => {
    //localFilePath :
    //path of image which was just uploaded to "uploads" folder
    const mainFolderName = "main";
    const filePathOnCloudinary = mainFolderName + "/" + localFilePath;
    cloudinary.uploader.upload(localFilePath, function (err, response) {
      if (err) {
        reject(err);
      }
      resolve(response.secure_url);
    });
  });
};
