import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seeker',
      required: true,
    },
    position: {
      type: String,
      default: '',
    },
    category: {
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
    salaryExpectations: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
      default: 'Ukraine',
    },
    city: {
      type: String,
      default: '',
    },
    relocation: {
      type: Boolean,
      default: false,
    },
    englishLevel: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    employmentOptions: {
      type: String,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Resume', ResumeSchema);
