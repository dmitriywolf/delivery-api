import mongoose from 'mongoose';

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
      default: false,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatar: {
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
