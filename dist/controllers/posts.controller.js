"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _posts = _interopRequireDefault(require("../models/posts.model"));

var _uploadImages = _interopRequireDefault(require("../utils.js/uploadImages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PostController = {
  async createPost(req, res) {
    /**
     * Expected format
     *
     * title: string
     * body: string,
     * description: string,
     * published: boolean,
     * category: string
     * postImages: []
     */
    const {
      body,
      user,
      files
    } = req;
    const postData = body;
    postData.owner = user._id;

    if (files) {
      postData.postImages = await (0, _uploadImages.default)(files);
    }

    const post = new _posts.default(postData);

    try {
      await post.save();
      return res.json({
        message: 'Post created successfully',
        data: post
      }).status(201);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // GET /posts?published=true
  // GET /posts?limit=2&skip=2
  // GET /posts?sortBy=createdAt:desc

  /**
   * NOTE
   * When consuming this endpoint, append the query string: 'published=true' to the URL
   */
  async getAllPosts(req, res) {
    const match = {};
    const sort = {};

    if (req.query.published) {
      match.published = req.query.published === 'true';
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } // I could also search by the 'owner' key
    // await req.user.populate("posts").execPopulate();


    try {
      await req.user.populate({
        path: 'posts',
        match,
        options: {
          limit: parseInt(req.query.limit, 10),
          skip: parseInt(req.query.skip, 10),
          sort
        }
      }).execPopulate();
      return res.json({
        message: 'Posts retrieved successfully',
        data: req.user.posts
      }).status(200);
    } catch (error) {
      return res.send(error).status(500);
    }
  },

  async updatePost(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'body', 'published'];
    const isValidUpdateOps = updates.every(update => {
      return allowedUpdates.includes(update);
    });

    if (!isValidUpdateOps) {
      return res.status(400).send('Invalid update');
    } // const _id = req.params._id;


    try {
      const post = await _posts.default.findOne({
        _id: req.params.id,
        owner: req.user._id
      });

      if (!post) {
        return res.status(404).send('Post not found');
      }

      const {
        body,
        files
      } = req;
      updates.forEach(update => {
        post[update] = body[update];
      });

      if (files) {
        post.postImages = await (0, _uploadImages.default)(files);
      }

      await post.save();
      return res.json({
        message: 'Post updated successfully',
        data: post
      }).status(200);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  async deletePost(req, res) {
    try {
      const post = await _posts.default.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id
      });

      if (!post) {
        return res.status(404).send('Post not found');
      }

      return res.json({
        message: 'Post deleted successfully'
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

};
var _default = PostController;
exports.default = _default;