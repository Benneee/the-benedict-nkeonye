"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postSchema = new _mongoose.default.Schema({
  /**
   * Requirements
   * Title
   * Body
   * Description
   * Category
   * PostImages
   * Published
   * Owner
   */
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Cannot create empty post']
  },
  description: {
    type: String,
    required: [true, 'Kindly add a description'],
    trim: true
  },
  category: {
    type: String,
    default: 'Personal'
  },
  postImages: [],
  published: {
    type: Boolean,
    default: false
  },
  owner: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Post = _mongoose.default.model('Post', postSchema);

var _default = Post;
/**
 * ToDos
 * Create a relationship between post and user
 * Also, add a ref field so that we can get the post creator's profile on fetching the post
 */

exports.default = _default;