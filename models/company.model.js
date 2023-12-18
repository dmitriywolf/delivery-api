import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    douPage: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    employeesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Company', CompanySchema);
