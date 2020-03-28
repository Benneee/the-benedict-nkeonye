import Post from '../models/posts.model';
import uploadImages from '../utils.js/uploadImages';

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
    const { body, user, files } = req;
    const postData = body;
    postData.owner = user._id;
    if (files) {
      postData.postImages = await uploadImages(files);
    }
    const post = new Post(postData);
    try {
      await post.save();
      return res
        .json({
          message: 'Post created successfully',
          data: post,
        })
        .status(201);
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
    }

    // I could also search by the 'owner' key
    // await req.user.populate("posts").execPopulate();
    try {
      await req.user
        .populate({
          path: 'posts',
          match,
          options: {
            limit: parseInt(req.query.limit, 10),
            skip: parseInt(req.query.skip, 10),
            sort,
          },
        })
        .execPopulate();
      return res
        .json({
          message: 'Posts retrieved successfully',
          data: req.user.posts,
        })
        .status(200);
    } catch (error) {
      return res.send(error).status(500);
    }
  },

  async updatePost(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'title',
      'description',
      'body',
      'published',
      'postImages',
    ];
    const isValidUpdateOps = updates.every((update) => {
      return allowedUpdates.includes(update);
    });

    if (!isValidUpdateOps) {
      return res.status(400).send('Invalid update');
    }

    // const _id = req.params._id;

    try {
      const post = await Post.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!post) {
        return res.status(404).send('Post not found');
      }

      updates.forEach((update) => {
        post[update] = req.body[update];
      });
      await post.save();

      return res
        .json({
          message: 'Post updated successfully',
          data: post,
        })
        .status(200);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  async deletePost(req, res) {
    try {
      const post = await Post.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!post) {
        return res.status(404).send('Post not found');
      }

      return res.json({
        message: 'Post deleted successfully',
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

export default PostController;
