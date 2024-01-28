import { Resume } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ isPublished: true })
      .populate('owner')
      .sort({ createdAt: -1 });

    const filteredResumes = resumes.map((r) => {
      const { owner, ...resumeData } = r._doc;
      const { __v, passwordHash, ...ownerData } = owner._doc;

      return {
        ...resumeData,
        owner: {
          ...ownerData,
        },
      };
    });

    res.status(200).json({
      resumes: filteredResumes,
    });
  } catch (err) {
    console.log('ERROR [getAllResumes]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({ _id: resumeId }).populate('owner');

    const { owner, ...resumeData } = resume._doc;
    const { __v, passwordHash, ...ownerData } = owner._doc;

    res.status(200).json({
      resume: {
        ...resumeData,
        owner: {
          ...ownerData,
        },
      },
    });
  } catch (err) {
    console.log('ERROR [getResumeById]', err);

    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ owner: req.userId });

    res.status(200).json({
      resume,
    });
  } catch (err) {
    console.log('ERROR [getMyResume]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const resumeId = req.params.id;

    const {
      position,
      category,
      skills,
      workExperience,
      experienceLevel,
      salaryExpectations,
      country,
      city,
      relocation,
      englishLevel,
      summary,
      employment,
      dontConsider,
      isPublished,
    } = req.body;

    const resume = await Resume.findById(resumeId);

    if (currentUserId !== resume.owner.toString()) {
      return res.status(403).json({
        message: RES_ERRORS.forbidden,
      });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId },
      {
        position,
        category,
        skills,
        workExperience,
        experienceLevel,
        salaryExpectations,
        country,
        city,
        relocation,
        englishLevel,
        summary,
        employment,
        dontConsider,
        isPublished,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      resume: updatedResume,
    });
  } catch (err) {
    console.log('ERROR [updateResumeById]', err);

    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
