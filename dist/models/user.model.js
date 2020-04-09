"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var bcrypt = _interopRequireWildcard(require("bcryptjs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  /**
   * Requirements
   * Name (required)
   * Email
   * Age
   * Avatar
   * Bio
   * Password
   * Token(generated)
   */
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    // So we don't have duplicate email address in the DB
    trim: true,
    lowercase: true,

    validate(value) {
      if (!_validator.default.isEmail(value)) {
        throw new Error('Email address is invalid');
      }
    }

  },
  age: {
    type: Number,
    default: 0,

    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }

  },
  avatar: {
    type: String
  },
  bio: {
    type: String,
    default: 'Hello there!'
  },
  password: {
    type: String,
    minlength: [7, 'Password must be at least 7 characters'],
    required: [true, 'Password is required'],
    trim: true,

    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error("Password cannot contain the text 'password'");
      }
    }

  },
  tokens: [{
    token: {
      type: String,
      required: [true, 'No authentication token']
    }
  }]
}, {
  timestamps: true
}); // Custom method to generate auth token

userSchema.methods.generateAuthToken = async function genToken() {
  const user = this;
  const token = jwt.sign({
    _id: user._id.toString()
  }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({
    token
  });
  await user.save();
  return token;
}; // Custom method to validate user on login


userSchema.statics.findByCredentials = async (email, password) => {
  // First, find the user by the email
  const user = await User.findOne({
    email
  });

  if (!user) {
    throw new Error('Email is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Password is incorrect');
  }

  return user;
}; // Custom method to hash user's password on create/update - middleware style


userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
}); // Virtual to fetch posts belonging to a user

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'owner'
}); // Custom method to share only necessary profile information on Login

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

const User = _mongoose.default.model('User', userSchema);

var _default = User;
/**
 * ToDos
 * Add tokens for authentication purposes
 * Create a virtual to enable us fetch posts belonging to a user
 * Create method to only share necessary profile information | DONE: uncomment last method
 */

exports.default = _default;