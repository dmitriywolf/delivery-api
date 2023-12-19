import mongoose from 'mongoose';
import { ROLES, SEEKER_SEARCH_STATUSES } from '#root/common/constants.js';
import Account from './account.model.js';

const SeekerSchema = new mongoose.Schema(
  {
    searchStatus: {
      type: String,
      default: SEEKER_SEARCH_STATUSES.active,
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
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default Account.discriminator(ROLES.seeker, SeekerSchema);
