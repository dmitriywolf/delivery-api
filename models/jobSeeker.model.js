import mongoose from 'mongoose';
import { ROLES } from '#root/common/constants.js';
import AccountModel from './account.model.js';

const JobSeekerSchema = new mongoose.Schema(
  {
    // Contacts
    phone: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    github: {
      type: String,
      default: '',
    },
    portfolio: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default AccountModel.discriminator(ROLES.jobSeeker, JobSeekerSchema);
