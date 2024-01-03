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
      default: 'Not Selected',
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
      default: 'no',
    },
    summary: {
      type: String,
      default: '',
    },
    remoteWork: {
      type: Boolean,
      default: false,
    },
    office: {
      type: Boolean,
      default: false,
    },
    freelance: {
      type: Boolean,
      default: false,
    },
    partTime: {
      type: Boolean,
      default: false,
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
