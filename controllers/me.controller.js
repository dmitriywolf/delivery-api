import { AccountModel } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export const getMe = async (req, res) => {
  try {
    const user = await AccountModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: RES_ERRORS.not_found,
      });
    }

    console.log('account', user._doc);

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ user: { ...userData } });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const app = 'wefwef';

// export const updateUser = async (req, res) => {
//   try {
//     const editedUserId = req.params.id;

//     // const user = await UserModel.findById(req.userId);

//     // if (!user) {
//     //   return res.status(404).json({
//     //     message: RES_ERRORS.not_found,
//     //   });
//     // }

//     // console.log('user', user._doc);

//     // const { passwordHash, ...userData } = user._doc;

//     // res.status(200).json({ user: { ...userData } });

//     res.status(200).json({
//       userId: req.userId,
//       params: editedUserId,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: RES_ERRORS.internal_server_error,
//     });
//   }
// };
