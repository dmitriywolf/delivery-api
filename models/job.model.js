import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    domain: {
      type: String,
      default: '',
    },
    skills: {
      type: String,
      default: '',
    },
    workExperience: {
      type: Number,
      default: 0,
    },
    experienceLevel: {
      type: String,
      default: '',
    },
    salaryRange: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    englishLevel: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    companyType: {
      type: String,
      default: '',
    },
    employmentOptions: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Job', JobSchema);
