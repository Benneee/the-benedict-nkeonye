import Post from '../models/posts.model';

const PostController = {
  async createPost(req, res) {
    /**
     * Expected format
     * title: string
     * body: string,
     * description: string,
     * published: boolean,
     * postImages: []
     */
    const post = new Post({
      ...req.body,
      owner: req.user._id,
    });
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
};

export default PostController;
