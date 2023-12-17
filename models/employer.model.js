import mongoose from 'mongoose';
import { ROLES } from '#root/common/constants.js';
import AccountModel from './account.model.js';

const EmployerSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default AccountModel.discriminator(ROLES.employer, EmployerSchema);
