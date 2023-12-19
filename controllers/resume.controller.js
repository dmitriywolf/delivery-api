import { Resume } from '#root/models/index.js';

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json({
      resumes,
    });
  } catch (err) {
    console.log('[getAllResumes]', err);
    res.status(500).json({
      message: 'Не удалось получить резюме',
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const result = await Resume.findOne({ _id: resumeId }).populate('owner');
    const resume = result._doc;
    const { passwordHash, __v, ...ownerView } = resume.owner._doc;

    res.status(200).json({
      resume: {
        ...resume,
        owner: {
          ...ownerView,
        },
      },
    });
  } catch (err) {
    console.log('[getResumeById]', err);

    res.status(500).json({
      message: 'Не удалось получить резюме',
    });
  }
};

export const updateResumeById = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const {
      position,
      category,
      skills,
      workExperience,
      salaryExpectations,
      country,
      city,
      relocation,
      englishLevel,
      summary,
      employmentOptions,
    } = req.body;

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId },
      {
        position,
        category,
        skills,
        workExperience,
        salaryExpectations,
        country,
        city,
        relocation,
        englishLevel,
        summary,
        employmentOptions,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      resume: updatedResume,
    });
  } catch (err) {
    console.log('[updateResumeById]', err);

    res.status(500).json({
      message: 'Не удалось обновить компанию',
    });
  }
};
