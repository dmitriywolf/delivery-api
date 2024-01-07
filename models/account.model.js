import mongoose from 'mongoose';
import { DEFAULT_USER_AVATAR } from '#root/common/constants.js';

const AccountSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: DEFAULT_USER_AVATAR,
    },
    phone: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  },
);

export default mongoose.model('Account', AccountSchema);
