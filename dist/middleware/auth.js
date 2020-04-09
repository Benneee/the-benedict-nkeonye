"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This middleware is to check if the user trying to login is a valid user
// It gets the token submitted with the user's request, then compares the token with
// the token belonging to the user in the DB., then grants the user access
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

    const user = await _user.default.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!user) {
      throw new Error('User records not found!');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      error: 'Please authenticate'
    });
  }
};

var _default = auth;
exports.default = _default;