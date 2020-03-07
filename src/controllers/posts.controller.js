import Post from '../models/posts.model';

const PostController = {
  async createPost(req, res) {
    /**
     * Expected format
     * title: string
     * body: string,
     * description: string,
     * published: boolean
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
};

export default PostController;
