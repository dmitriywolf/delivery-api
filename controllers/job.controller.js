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
      salaryFrom,
      country,
      city,
      relocation,
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
      salaryFrom,
      country,
      city,
      relocation,
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
    console.log('[getJobById]', err);

    res.status(500).json({
      message: 'Не удалось получить вакансию',
    });
  }
};
