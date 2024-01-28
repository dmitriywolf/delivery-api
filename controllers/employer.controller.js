import { Employer, Job, Doc } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';
import { clearImage } from '#root/utils/index.js';

export const getAllEmployers = async (req, res) => {
  try {
    // Send only published companies
    const employers = await Employer.find({ isPublished: true }).sort({ createdAt: -1 });

    const filteredEmployers = employers.map((e) => {
      const { __v, passwordHash, ...employerData } = e._doc;
      return employerData;
    });

    res.status(200).json({ employers: filteredEmployers });
  } catch (err) {
    console.log('ERROR [getAllEmployers]', err);
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

    // Get docs
    const docs = await Doc.find({ owner: employerId });

    res.status(200).json({ user: { ...employerData }, jobs, docs });
  } catch (err) {
    console.log('ERROR [getEmployerById]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const updateEmployer = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const employerId = req.params.id;

    if (currentUserId !== employerId) {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }

    const { firstName, lastName, avatar, phone, linkedin, userPosition } = req.body;

    let avatarUrl;

    if (req.file) {
      avatarUrl = req.file.path.replace('\\', '/');
    } else {
      avatarUrl = avatar;
    }

    const employer = await Employer.findById(employerId);

    if (avatarUrl !== employer.avatar) {
      clearImage(employer.avatar);
    }

    employer.firstName = firstName;
    employer.lastName = lastName;
    employer.avatar = avatarUrl;
    employer.phone = phone;
    employer.linkedin = linkedin;
    employer.userPosition = userPosition;

    const updatedEmployer = await employer.save();

    const { passwordHash, __v, ...accountData } = updatedEmployer._doc;

    res.status(200).json({ user: { ...accountData } });
  } catch (err) {
    console.log('ERROR [updateEmpoyer]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const employerId = req.params.id;

    if (currentUserId !== employerId) {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }

    const {
      companyName,
      companyWebSite,
      companyDouPage,
      companyLogo,
      companyEmployeesCount,
      companyDescription,
      companyOffices,
    } = req.body;

    let logoUrl;

    if (req.file) {
      logoUrl = req.file.path.replace('\\', '/');
    } else {
      logoUrl = companyLogo;
    }

    const employer = await Employer.findById(employerId);

    if (logoUrl !== employer.companyLogo) {
      clearImage(employer.companyLogo);
    }

    employer.companyName = companyName;
    employer.companyWebSite = companyWebSite;
    employer.companyDouPage = companyDouPage;
    employer.companyLogo = logoUrl;
    employer.companyEmployeesCount = companyEmployeesCount;
    employer.companyDescription = companyDescription;
    employer.companyOffices = companyOffices;
    employer.isPublished = true;

    const updatedCompany = await employer.save();

    const { passwordHash, __v, ...accountData } = updatedCompany._doc;

    res.status(200).json({ user: { ...accountData } });
  } catch (err) {
    console.log('ERROR [updateCompany]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
