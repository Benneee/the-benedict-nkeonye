"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadSingleImage = async file => {
  let imageUrl;

  if (file) {
    const result = await _cloudinary.default.v2.uploader.upload(file.path);
    imageUrl = result.secure_url;
  }

  return imageUrl;
};

var _default = uploadSingleImage;
exports.default = _default;