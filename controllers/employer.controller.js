import { Employer, Job } from '#root/models/index.js';
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

    // Get jobs
    const jobs = await Job.find({ author: employerId }).populate('author');

    const { passwordHash, __v, ...employerData } = employer._doc;

    res.status(200).json({ user: { ...employerData }, jobs });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const updateEmployerById = async (req, res) => {
  try {
    const employerId = req.params.id;

    const {
      firstName,
      lastName,
      avatar,
      phone,
      linkedin,
      userPosition,
      companyName,
      companyWebSite,
      companyDouPage,
      companyLogo,
      companyEmployeesCount,
      companyDescription,
    } = req.body;

    const updatedEmployer = await Employer.findOneAndUpdate(
      { _id: employerId },
      {
        firstName,
        lastName,
        avatar,
        phone,
        linkedin,
        userPosition,
        companyName,
        companyWebSite,
        companyDouPage,
        companyLogo,
        companyEmployeesCount,
        companyDescription,
      },
      {
        new: true,
      },
    );

    const { passwordHash, __v, ...accountData } = updatedEmployer._doc;

    res.status(200).json({ user: { ...accountData } });
  } catch (err) {
    console.log('[updateEmpoyer]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
