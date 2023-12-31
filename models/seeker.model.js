import mongoose from 'mongoose';
import { ROLES } from '#root/common/constants.js';
import Account from './account.model.js';

const SeekerSchema = new mongoose.Schema(
  {
    searchStatus: {
      type: Boolean,
      default: true,
    },
    skype: {
      type: String,
      default: '',
    },
    telegram: {
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
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default Account.discriminator(ROLES.seeker, SeekerSchema);
