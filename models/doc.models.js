import mongoose from 'mongoose';

const DocSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employer',
      required: true,
    },
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Doc', DocSchema);
