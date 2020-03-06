import User from '../models/user.model';
// import auth from '../middleware/auth';

const UserController = {
  async createUser(req, res) {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      return res
        .json({
          status: 'account created successfully',
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
        status: 'login successful',
        data: user,
        token,
      });
    } catch (error) {
      return res.send(error).status(400);
    }
  },
};

export default UserController;
