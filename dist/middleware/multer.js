"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _multer.default)({
  storage: _multer.default.diskStorage({}),
  limits: {
    fileSize: 200 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
      callback('File format not supported', false);
      return;
    }

    callback(null, true);
  }
});

exports.default = _default;