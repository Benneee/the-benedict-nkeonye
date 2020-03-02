import { Mongoose } from 'mongoose';
import validator from 'validator';

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true, // So we don't have duplicate email address in the DB
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email address is invalid');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    avatar: {
      type: Buffer,
    },
    bio: {
      type: String,
      default: 'Hello there!',
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
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = Mongoose.model('User', userSchema);

export default User;

/**
 * ToDos
 * Add tokens for authentication purposes
 * Create a virtual to enable us fetch posts belonging to a user
 * Create method to only share necessary profile information
 */
