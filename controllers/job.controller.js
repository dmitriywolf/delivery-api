import { Job, Notification, Seeker } from '#root/models/index.js';
import { NOTIFICATION_TYPES, RES_ERRORS } from '#root/common/constants.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('author').sort({ createdAt: -1 });

    const filteredJobs = jobs.map((j) => {
      const { author, ...jobData } = j._doc;
      const { __v, passwordHash, ...authorData } = author._doc;

      return {
        ...jobData,
        author: {
          ...authorData,
        },
      };
    });

    res.status(200).json({
      jobs: filteredJobs,
    });
  } catch (err) {
    console.log('ERROR [getAllJobs]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const result = await Job.findOneAndUpdate(
      { _id: jobId },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
    ).populate('author');

    const job = result._doc;

    const { passwordHash, __v, ...authorView } = job.author._doc;

    res.status(200).json({
      job: {
        ...job,
        author: {
          ...authorView,
        },
      },
    });
  } catch (err) {
    console.log('ERROR [getJobById]', err);

    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const {
      title,
      category,
      domain,
      skills,
      workExperience,
      experienceLevel,
      salaryRange,
      country,
      city,
      englishLevel,
      summary,
      companyType,
      employment,
    } = req.body;

    const job = new Job({
      author: req.userId,
      title,
      category,
      domain,
      skills,
      workExperience,
      experienceLevel,
      salaryRange,
      country,
      city,
      englishLevel,
      summary,
      companyType,
      employment,
    });

    const jobData = await job.save();

    res.status(201).json({
      job: jobData,
    });
  } catch (err) {
    console.log('ERROR [createJob]', err);

    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const jobId = req.params.id;

    const {
      title,
      category,
      domain,
      skills,
      workExperience,
      experienceLevel,
      salaryRange,
      country,
      city,
      englishLevel,
      summary,
      companyType,
      employment,
      isArchive,
    } = req.body;

    const job = await Job.findById(jobId);

    if (currentUserId !== job.author.toString()) {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      {
        title,
        category,
        domain,
        skills,
        workExperience,
        experienceLevel,
        salaryRange,
        country,
        city,
        englishLevel,
        summary,
        companyType,
        employment,
        isArchive,
      },
      {
        new: true,
      },
    ).populate('applications', ['_id', 'firstName', 'lastName', 'resume']);

    res.status(200).json({
      job: updatedJob,
    });
  } catch (err) {
    console.log('ERROR [updateJob]', err);

    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getMyVacancies = async (req, res) => {
  try {
    const jobs = await Job.find({ author: req.userId })
      .populate('applications', ['_id', 'firstName', 'lastName', 'resume'])
      .sort({ createdAt: -1 });

    res.status(200).json({
      jobs,
    });
  } catch (err) {
    console.log('ERROR [getMyVacancies]', err);

    res.status(500).json({
      message: 'Не удалось получить вакансии',
    });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const seekerId = req.userId;

    const applyIsExist = await Job.findOne({ _id: jobId, applications: seekerId });

    if (applyIsExist) {
      return res.status(400).json({ message: 'You already applied' });
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { $push: { applications: seekerId } },
      {
        new: true,
      },
    );

    const seeker = await Seeker.findById(seekerId);

    // Создаем нотификацию
    const notification = new Notification({
      userId: updatedJob.author._id,
      type: NOTIFICATION_TYPES.applyToJob,
      data: {
        job: {
          id: updatedJob._id,
          title: updatedJob.title,
        },
        seeker: {
          id: seeker.resume,
          name: `${seeker.firstName} ${seeker.lastName}`,
          avatar: seeker.avatar,
        },
      },
    });

    await notification.save();

    res.status(201).json({ seekerId });
  } catch (err) {
    console.log('ERROR [applyToJob]', err);

    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const seekerId = req.userId;

    const applications = await Job.find({ applications: seekerId })
      .populate('author')
      .sort({ createdAt: -1 });

    const filteredApplications = applications.map((j) => {
      const { author, ...jobData } = j._doc;
      const { __v, passwordHash, ...authorData } = author._doc;

      return {
        ...jobData,
        author: {
          ...authorData,
        },
      };
    });

    res.status(200).json({ applications: filteredApplications });
  } catch (err) {
    console.log('ERROR [applyToJob]', err);

    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
