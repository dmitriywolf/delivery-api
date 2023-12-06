import jwt from 'jsonwebtoken';
import { RES_ERRORS } from '#root/common/constants.js';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(401).json({
        message: RES_ERRORS.unauthorized,
      });
    }
  } else {
    return res.status(401).json({
      message: RES_ERRORS.unauthorized,
    });
  }
};
