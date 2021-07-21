import {
  ERROR,
  SUCCESS,
  SUCCESS_MODIFICATION,
} from "../../constants/statuscodes";
import { ImageCRUD } from "../../database/crud";
import { upload } from "../../utils/fileupload";

const uploadAnImage =
  ("/api/v1/upload",
  (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          res.status(ERROR).end("Unable to upload");
        } else {
          //get the details
          const url = `http://localhost:3005/uploads/${req.file.filename}`;

          res.status(SUCCESS).json({
            message: "Success",
            image: {
              path: url,
            },
          });
        }
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

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
