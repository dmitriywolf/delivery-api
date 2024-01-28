import { Employer } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export default async (req, res, next) => {
  try {
    const seeker = await Employer.findOne({ _id: req.userId });

    if (seeker) {
      next();
    } else {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }
  } catch (e) {
    return res.status(403).json({
      message: RES_ERRORS.forbidden,
    });
  }
};
