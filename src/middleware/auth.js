import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// This middleware is to check if the user trying to login is a valid user
// It gets the token submitted with the user's requst, then compares the token with
// the token belonging to the user in the DB., then grants the user access
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('User records not found!');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

export default auth;
