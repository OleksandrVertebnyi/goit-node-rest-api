import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import HttpError from '../helpers/HttpError.js';

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw HttpError(401, 'Not authorized');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw HttpError(401, 'Not authorized');
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (!user || user.token !== token) {
      throw HttpError(401, 'Not authorized');
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, 'Not authorized'));
  }
};

export default auth;