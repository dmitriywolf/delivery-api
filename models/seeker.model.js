import mongoose from 'mongoose';
import { ROLES, SEEKER_SEARCH_STATUSES } from '#root/common/constants.js';
import AccountModel from './account.model.js';

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
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default AccountModel.discriminator(ROLES.seeker, SeekerSchema);
