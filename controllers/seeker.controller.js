import { Seeker } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';
import { clearImage } from '#root/utils/index.js';

export const updateSeeker = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const seekerId = req.params.id;

    if (currentUserId !== seekerId) {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }

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
    console.log('ERROR [updateSeeker]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
