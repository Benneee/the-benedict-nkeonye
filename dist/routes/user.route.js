"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _multer = _interopRequireDefault(require("../middleware/multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
/**
 * Create users (POST)
 */

router.post('/', _multer.default.single('avatar'), _user.default.createUser);
router.post('/login', _user.default.loginUser);
router.post('/logout', _auth.default, _user.default.logoutUser);
router.post('/logoutAll', _auth.default, _user.default.logoutUserAll);
router.get('/profile', _auth.default, _user.default.getUserProfile);
router.patch('/profile/update', [_auth.default, _multer.default.single('avatar')], _user.default.updateUserProfile);
router.patch('/profile/reset_password', _auth.default, _user.default.resetPassword); // When user is logged in

router.delete('/profile', _auth.default, _user.default.deleteProfile);
var _default = router;
exports.default = _default;