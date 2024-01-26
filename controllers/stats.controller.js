import { Resume, Job, Employer } from '#root/models/index.js';
import { EXPERIENCE_LEVELS, EMPLOYMENT } from '#root/common/constants.js';

export const getTotalStat = async (req, res) => {
  try {
    const companies = await Employer.find();
    const resumes = await Resume.find();
    const jobs = await Job.find();

    res.status(200).json({
      stat: [
        {
          key: 'Total',
          Companies: companies.length,
          Vacancies: jobs.length,
          Candidates: resumes.length,
        },
      ],
    });
  } catch (err) {
    console.log('[getLevelStat]', err);
    res.status(500).json({
      message: 'Не удалось получить статистику',
    });
  }
};

export const getLevelStat = async (req, res) => {
  try {
    const resumes = await Resume.find();
    const jobs = await Job.find();

    const stat = EXPERIENCE_LEVELS.map((level) => {
      const resumesCount = resumes.filter((r) => r.experienceLevel === level)?.length || 0;
      const jobsCount = jobs.filter((j) => j.experienceLevel === level)?.length || 0;

      return {
        level,
        Vacancies: jobsCount,
        Candidates: resumesCount,
      };
    });

    res.status(200).json({
      stat,
    });
  } catch (err) {
    console.log('[getLevelStat]', err);
    res.status(500).json({
      message: 'Не удалось получить статистику',
    });
  }
};

export const getEmploymentStat = async (req, res) => {
  try {
    const resumes = await Resume.find();
    const jobs = await Job.find();

    const stat = EMPLOYMENT.map((employment) => {
      const resumesCount = resumes.filter((r) => r.employment.includes(employment))?.length || 0;
      const jobsCount = jobs.filter((j) => j.employment.includes(employment))?.length || 0;

      return {
        employment,
        Vacancies: jobsCount,
        Candidates: resumesCount,
      };
    });

    res.status(200).json({
      stat,
    });
  } catch (err) {
    console.log('[getEmploymentStat]', err);

    res.status(500).json({
      message: 'Не удалось получить статистику',
    });
  }
};

export const getNotConsiderDomainsStat = async (req, res) => {
  try {
    const resumes = await Resume.find();

    const stat = {
      adult: 0,
      gambling: 0,
      dating: 0,
      gameDev: 0,
      blockchain: 0,
    };

    resumes.forEach((r) => {
      r.dontConsider.forEach((d) => {
        if (d === 'Adult') stat.adult += 1;
        if (d === 'Gambling') stat.gambling += 1;
        if (d === 'Dating') stat.dating += 1;
        if (d === 'Gamedev') stat.gameDev += 1;
        if (d === 'Blockchain/Crypto') stat.blockchain += 1;
      });
    });

    const statPercentage = {
      key: "Don't consider",
      Adult: Math.round((stat.adult / resumes.length) * 100),
      Gambling: Math.round((stat.gambling / resumes.length) * 100),
      Dating: Math.round((stat.dating / resumes.length) * 100),
      GameDev: Math.round((stat.gameDev / resumes.length) * 100),
      Blockchain: Math.round((stat.blockchain / resumes.length) * 100),
    };

    res.status(200).json({
      stat: [statPercentage],
    });
  } catch (err) {
    console.log('[getNotConsiderDomainsStat]', err);

    res.status(500).json({
      message: 'Не удалось получить статистику',
    });
  }
};
