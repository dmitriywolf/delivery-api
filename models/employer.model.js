import mongoose from 'mongoose';
import { ROLES, DEFAULT_COMPANY_LOGO } from '#root/common/constants.js';
import Account from './account.model.js';

const EmployerSchema = new mongoose.Schema(
  {
    userPosition: {
      type: String,
      default: '',
    },
    companyName: {
      type: String,
      default: '',
    },
    companyHiresCount: {
      type: Boolean,
      default: false,
    },
    companyWebSite: {
      type: String,
      default: '',
    },
    companyDouPage: {
      type: String,
      default: '',
    },
    companyLogo: {
      type: String,
      default: DEFAULT_COMPANY_LOGO,
    },
    companyEmployeesCount: {
      type: Number,
      default: 0,
    },
    companyDescription: {
      type: String,
      default: '',
    },
    companyOffices: {
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
    discriminatorKey: 'role',
  },
);

export default Account.discriminator(ROLES.employer, EmployerSchema);
