import { Mongoose } from 'mongoose';
import validator from 'validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const userSchema = new Mongoose.Schema(
  {
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
    tokens: [
      {
        token: {
          type: String,
          required: [true, 'No authentication token'],
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Custom method to generate auth token
userSchema.methods.generateAuthToken = async function genToken() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Custom method to validate user on login
userSchema.statics.findByCredentials = async (email, password) => {
  // First, find the user by the email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is incorrect');
  }
  return user;
};

// Custom method to hash user's password on create/update - middleware style
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Custom method to share only necessary profile information
// userSchema.methods.toJSON = function() {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   delete userObject.tokens;
// };

const User = Mongoose.model('User', userSchema);

export default User;

/**
 * ToDos
 * Add tokens for authentication purposes
 * Create a virtual to enable us fetch posts belonging to a user
 * Create method to only share necessary profile information | DONE: uncomment last method
 */
