import { Employer } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();

    res.status(200).json({ employers });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getEmployerById = async (req, res) => {
  try {
    const employerId = req.params.id;

    const employer = await Employer.findById(employerId);

    if (!employer) {
      return res.status(404).json({
        message: RES_ERRORS.not_found,
      });
    }

    const { passwordHash, __v, ...employerData } = employer._doc;

    res.status(200).json({ user: { ...employerData } });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const updateEmployerById = async (req, res) => {
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

    const updatedSeeker = await Employer.findOneAndUpdate(
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
