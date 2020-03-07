import User from '../models/user.model';

const UserController = {
  async createUser(req, res) {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      return res
        .json({
          message: 'Account created successfully',
          data: user,
          token,
        })
        .status(201);
    } catch (error) {
      return res.send(error).status(400);
    }
  },

  async loginUser(req, res) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password,
      );
      const token = await user.generateAuthToken();
      return res.json({
        message: 'Login successful',
        data: user,
        token,
      });
    } catch (error) {
      return res.send(error).status(400);
    }
  },

  async logoutUser(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(
        token => token.token !== req.token,
      );
      await req.user.save();
      return res.send('Logout successful').status(200);
    } catch (error) {
      return res.send(error).status(500);
    }
  },

  async logoutUserAll(req, res) {
    try {
      req.user.tokens = [];
      await req.user.save();
      return res.send('Log out on all devices successful').status(200);
    } catch (error) {
      return res.send(error).status(500);
    }
  },

  async getUserProfile(req, res) {
    const { user } = req;
    try {
      return res
        .json({
          message: 'User profile retrieved successfully',
          data: user,
        })
        .status(200);
    } catch (error) {
      return res.send(error).status(404);
    }
  },
};

export default UserController;
