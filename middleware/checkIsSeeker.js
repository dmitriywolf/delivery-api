import { Seeker } from '#root/models/index.js';

export default (req, res, next) => {
  try {
    const seeker = Seeker.findOne({ _id: req.userId });

    if (seeker) {
      next();
    } else {
      return res.status(403).json({
        message: 'You are not a seeker',
      });
    }
  } catch (e) {
    return res.status(401).json({
      message: 'Internal server error',
    });
  }
};
