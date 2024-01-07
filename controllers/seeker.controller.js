import { Seeker } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';
import { clearImage } from '#root/utils/index.js';

// export const getAllSeekers = async (req, res) => {
//   try {
//     const seekers = await Seeker.find().populate('resume');

//     // Only published
//     const publishedSeekers = seekers.filter((c) => !!c.resume.isPublished);

//     res.status(200).json({ seekers: publishedSeekers });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: RES_ERRORS.internal_server_error,
//     });
//   }
// };

// export const getSeekerById = async (req, res) => {
//   try {
//     const seekerId = req.params.id;

//     const seeker = await Seeker.findById(seekerId).populate('resume');

//     if (!seeker) {
//       return res.status(404).json({
//         message: RES_ERRORS.not_found,
//       });
//     }

//     const { passwordHash, __v, ...seekerData } = seeker._doc;

//     res.status(200).json({ user: { ...seekerData } });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: RES_ERRORS.internal_server_error,
//     });
//   }
// };

export const updateSeekerById = async (req, res) => {
  try {
    const seekerId = req.params.id;

    const {
      firstName,
      lastName,
      phone,
      linkedin,
      searchStatus,
      skype,
      telegram,
      github,
      portfolio,
      avatar,
    } = req.body;

    let avatarUrl;

    if (req.file) {
      avatarUrl = req.file.path.replace('\\', '/');
    } else {
      avatarUrl = avatar;
    }

    const seeker = await Seeker.findById(seekerId);

    if (avatarUrl !== seeker.avatar) {
      clearImage(seeker.avatar);
    }

    seeker.firstName = firstName;
    seeker.lastName = lastName;
    seeker.phone = phone;
    seeker.avatar = avatarUrl;
    seeker.linkedin = linkedin;
    seeker.searchStatus = searchStatus;
    seeker.skype = skype;
    seeker.telegram = telegram;
    seeker.github = github;
    seeker.portfolio = portfolio;

    const updatedSeeker = await seeker.save();

    const { passwordHash, __v, ...accountData } = updatedSeeker._doc;

    res.status(200).json({ user: { ...accountData } });
  } catch (err) {
    console.log('[updateSeeker]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
