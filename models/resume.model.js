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
      type: [String],
      default: [],
    },
    workExperience: {
      type: Number,
      default: 0,
    },
    experienceLevel: {
      type: String,
      default: '',
    },
    salaryExpectations: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
      default: '',
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
    employment: {
      type: [String],
      default: [],
    },
    dontConsider: {
      type: [String],
      default: [],
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
