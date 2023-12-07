import { UserModel } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: RES_ERRORS.not_found,
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ user: { ...userData } });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getAlluser = () => {};
