"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  log
} = console;
const url = process.env.MONGODB_URL;

const db = _mongoose.default.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => log('Connected to MongoDB')).catch(error => {
  log(error);
});

var _default = db;
exports.default = _default;