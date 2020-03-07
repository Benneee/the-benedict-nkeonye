import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    body: {
      type: String,
      required: [true, 'Cannot create empty post'],
    },
    description: {
      type: String,
      required: [true, 'Kindly add a description'],
      trim: true,
    },
    postImages: [
      {
        postImage: {
          type: Buffer,
        },
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);

export default Post;

/**
 * ToDos
 * Create a relationship between post and user
 * Also, add a ref field so that we can get the post creator's profile on fetching the post
 */
