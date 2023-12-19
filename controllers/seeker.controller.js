import { Seeker } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export const getAllSeekers = async (req, res) => {
  try {
    const seekers = await Seeker.find().populate('resume');

    res.status(200).json({ seekers });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getSeekerById = async (req, res) => {
  try {
    const seekerId = req.params.id;

    const seeker = await Seeker.findById(seekerId).populate('resume');

    if (!seeker) {
      return res.status(404).json({
        message: RES_ERRORS.not_found,
      });
    }

    const { passwordHash, __v, ...seekerData } = seeker._doc;

    res.status(200).json({ user: { ...seekerData } });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

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
    } = req.body;

    const updatedSeeker = await Seeker.findOneAndUpdate(
      { _id: seekerId },
      {
        firstName,
        lastName,
        phone,
        linkedin,
        searchStatus,
        skype,
        telegram,
        github,
        portfolio,
      },
      {
        new: true,
      },
    );

    const { passwordHash, __v, ...accountData } = updatedSeeker._doc;

    res.status(200).json({ user: { ...accountData } });
  } catch (err) {
    console.log('[updateSeeker]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
