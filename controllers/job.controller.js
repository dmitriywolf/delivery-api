import { Job } from '#root/models/index.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
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

export const getTopJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      jobs: jobs.slice(0, 4),
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

    const result = await Job.findOne({ _id: jobId }).populate('author');
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

export const getJobsByEmployerId = async (req, res) => {
  try {
    const userId = req.params.id;

    const jobs = await Job.find({ author: userId });

    res.status(200).json({
      jobs,
    });
  } catch (err) {
    console.log('[getОЩиіByUserId]', err);

    res.status(500).json({
      message: 'Не удалось получить вакансии',
    });
  }
};

export const getMyVacancies = async (req, res) => {
  try {
    console.log('req.userId', req.userId);
    const jobs = await Job.find({ author: req.userId });

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
