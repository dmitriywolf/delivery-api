import { SeekerModel, AccountModel, EmployerModel } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export const getMe = async (req, res) => {
  try {
    const user = await AccountModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: RES_ERRORS.not_found,
      });
    }

    const { passwordHash, __v, ...userData } = user._doc;

    res.status(200).json({ user: { ...userData } });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const updateSeeker = async (req, res) => {
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

    const updatedSeeker = await SeekerModel.findOneAndUpdate(
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

export const updateEmployer = async (req, res) => {
  try {
    const employerId = req.params.id;

    const { firstName, lastName, phone, linkedin, position, country } = req.body;

    const updatedEmployer = await EmployerModel.findOneAndUpdate(
      { _id: employerId },
      {
        firstName,
        lastName,
        phone,
        linkedin,
        position,
        country,
      },
      {
        new: true,
      },
    );

    const { passwordHash, __v, ...accountData } = updatedEmployer._doc;

    res.status(200).json({ user: { ...accountData } });
  } catch (err) {
    console.log('[updateEmployer]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
