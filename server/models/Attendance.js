import mongoose from 'mongoose';
import { ATTENDANCE_STATUS_LIST, ATTENDANCE_STATUS } from '../config/constants.js';

const attendanceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      index: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: [true, 'Attendance date string is required'],
      index: true,
    },
    checkIn: {
      type: Date,
      default: null,
    },
    checkOut: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ATTENDANCE_STATUS_LIST,
      default: ATTENDANCE_STATUS.PRESENT,
      index: true,
    },
    totalWorkMinutes: {
      type: Number,
      default: 0,
    },
    lateMinutes: {
      type: Number,
      default: 0,
    },
    checkInNote: {
      type: String,
      trim: true,
      default: '',
    },
    checkOutNote: {
      type: String,
      trim: true,
      default: '',
    },
    isCorrectionApplied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// One attendance record per employee per company per calendar day
attendanceSchema.index({ company: 1, employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ company: 1, date: 1, status: 1 });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
