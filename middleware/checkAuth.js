import { RES_ERRORS } from '#root/common/constants.js';
import { verifyAuthToken } from '#root/utils/index.js';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = verifyAuthToken(token);

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
