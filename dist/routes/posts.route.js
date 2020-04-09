"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _posts = _interopRequireDefault(require("../controllers/posts.controller"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _multer = _interopRequireDefault(require("../middleware/multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post('/', [_auth.default, _multer.default.array('postImages')], _posts.default.createPost);
router.get('/', _auth.default, _posts.default.getAllPosts);
router.patch('/:id', [_auth.default, _multer.default.array('postImages')], _posts.default.updatePost);
router.delete('/:id', _auth.default, _posts.default.deletePost);
var _default = router;
exports.default = _default;