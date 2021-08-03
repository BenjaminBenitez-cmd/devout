import {
  ERROR,
  SUCCESS,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import { ImageCRUD } from "../../database/crud";
import { upload } from "../../utils/fileupload";
import { uploadToCloudinary } from "../services/image.service";
import fs from "fs";

const uploadAnImage = (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.status(ERROR).end("Unable to upload");
      } else {
        const response = await uploadToCloudinary(req.file.path);
        fs.unlinkSync(req.file.path);
        res.status(SUCCESS).json({
          message: "Success",
          image: {
            path: response,
          },
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

const deleteAnImage = async (request, response, next) => {
  try {
    await ImageCRUD.deleteOne(request.params.imageid);
    response.status(SUCCESS_MODIFICATION).end();
  } catch (err) {
    next(err);
  }
};

const ImageControllers = {
  uploadAnImage,
  deleteAnImage,
};

export default ImageControllers;
