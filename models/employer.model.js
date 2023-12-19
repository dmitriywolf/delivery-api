import mongoose from 'mongoose';
import { ROLES } from '#root/common/constants.js';
import Account from './account.model.js';

const EmployerSchema = new mongoose.Schema(
  {
    userPosition: {
      type: String,
      default: '',
    },
    // Company info
    company: {
      name: {
        type: String,
        default: '',
      },
      hiresCount: {
        type: Boolean,
        default: false,
      },
      webSite: {
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
      eployeesCount: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default Account.discriminator(ROLES.employer, EmployerSchema);
