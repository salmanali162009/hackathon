import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Holiday title is required'],
      trim: true,
      maxlength: 120,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: [true, 'Holiday date string is required'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

holidaySchema.index({ company: 1, date: 1 }, { unique: true });

export const Holiday = mongoose.model('Holiday', holidaySchema);
export default Holiday;
