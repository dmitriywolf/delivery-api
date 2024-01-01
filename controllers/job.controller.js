import { Job } from '#root/models/index.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('author');
    res.status(200).json({
      jobs,
    });
  } catch (err) {
    console.log('[getAllJobs]', err);
    res.status(500).json({
      message: 'Не удалось получить вакансии',
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

    console.log(job);

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
    console.log('[getJobById]', err);

    res.status(500).json({
      message: 'Не удалось получить вакансию',
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
      employmentOptions,
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
      employmentOptions,
    });

    const jobData = await job.save();

    res.status(201).json({
      job: jobData,
    });
  } catch (err) {
    console.log('ERROR [createJob]', err);

    res.status(500).json({
      message: 'Не удалось создать вакансию',
    });
  }
};

export const updateJob = async (req, res) => {
  try {
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
      employmentOptions,
    } = req.body;

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
        employmentOptions,
      },
      {
        new: true,
      },
    ).populate('applications', ['_id', 'firstName', 'lastName']);

    res.status(200).json({
      job: updatedJob,
    });
  } catch (err) {
    console.log('ERROR [updateJob]', err);

    res.status(500).json({
      message: 'Не удалось обновить вакансию',
    });
  }
};

export const getMyVacancies = async (req, res) => {
  try {
    const jobs = await Job.find({ author: req.userId }).populate('applications', [
      '_id',
      'firstName',
      'lastName',
    ]);

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

    await Job.findOneAndUpdate({ _id: jobId }, { $push: { applications: seekerId } });

    res.status(201).json({ seekerId });
  } catch (err) {
    console.log('[applyToJob]', err);

    res.status(500).json({
      message: 'Не удалось получить вакансию',
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const seekerId = req.userId;

    const applications = await Job.find({ applications: seekerId }).populate('author');

    res.status(200).json({ applications });
  } catch (err) {
    console.log('[applyToJob]', err);

    res.status(500).json({
      message: 'Не удалось получить мои отклики',
    });
  }
};
