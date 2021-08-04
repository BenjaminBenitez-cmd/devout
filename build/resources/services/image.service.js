"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToCloudinary = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _cloudinary = _interopRequireDefault(require("../../utils/cloudinary"));

var uploadToCloudinary = function uploadToCloudinary(localFilePath) {
  return new Promise(function (resolve, reject) {
    //localFilePath :
    //path of image which was just uploaded to "uploads" folder
    var mainFolderName = "main";
    var filePathOnCloudinary = mainFolderName + "/" + localFilePath;

    _cloudinary["default"].uploader.upload(localFilePath, function (err, response) {
      if (err) {
        reject(err);
      }

      resolve(response.secure_url);
    });
  });
};

exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=image.service.js.map