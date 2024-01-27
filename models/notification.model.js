import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    isWatched: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Notification', NotificationSchema);
