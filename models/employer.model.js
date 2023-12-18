import mongoose from 'mongoose';
import { ROLES } from '#root/common/constants.js';
import AccountModel from './account.model.js';

const EmployerSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    hasHires: {
      type: Boolean,
      default: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default AccountModel.discriminator(ROLES.employer, EmployerSchema);
