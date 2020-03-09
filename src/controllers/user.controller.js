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
      if (!user) {
        return res.send().status(400);
      }
      const token = await user.generateAuthToken();
      return res
        .json({
          message: 'Login successful',
          data: user,
          token,
        })
        .status(200);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async logoutUser(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token,
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

  async updateUserProfile(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'bio', 'email'];
    const isValidUpdatedOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );
    if (!isValidUpdatedOperation) {
      return res
        .json({
          message: 'Invalid update',
        })
        .status(400);
    }
    try {
      // 1. Find the user about to be updated
      const { user } = req;
      // 2. Loop through the proposed updates & assign the values accordingly
      updates.forEach((update) => {
        user[update] = req.body[update];
      });
      /**
       * 3. Call the save method on the document,
       * this then allows the middleware to deal with the record being updated as well
       *  */
      await user.save();
      return res.json({
        message: 'Profile updated successfully',
        data: user,
      });
    } catch (error) {
      return res.send(error).status(400);
    }
  },

  async resetPassword(req, res) {
    const { user } = req;
    try {
      user.password = req.body.password;
      await user.save();
      return res
        .json({
          message: 'Password updated successfully',
          data: user,
        })
        .status(200);
    } catch (error) {
      return res.send(error).status(400);
    }
  },

  async deleteProfile(req, res) {
    try {
      await req.user.remove();
      return res.json({
        message: `Account with the email: ${req.user.email} deleted`,
      });
    } catch (error) {
      return res.send(error).status(500);
    }
  },
};

export default UserController;
