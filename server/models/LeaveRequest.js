import mongoose from 'mongoose';
import { LEAVE_STATUS_LIST, LEAVE_STATUS } from '../config/constants.js';

const leaveRequestSchema = new mongoose.Schema(
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
    leaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LeaveType',
      required: true,
      index: true,
    },
    leaveTypeCode: {
      type: String,
      required: true,
      uppercase: true,
    },
    startDate: {
      type: String, // YYYY-MM-DD
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: String, // YYYY-MM-DD
      required: [true, 'End date is required'],
    },
    daysCount: {
      type: Number,
      required: true,
      min: 1,
    },
    reason: {
      type: String,
      required: [true, 'Reason for leave is required'],
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: LEAVE_STATUS_LIST,
      default: LEAVE_STATUS.PENDING,
      index: true,
    },
    decidedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    decisionNote: {
      type: String,
      trim: true,
      default: '',
    },
    decidedAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

leaveRequestSchema.index({ company: 1, employee: 1, startDate: 1, endDate: 1 });
leaveRequestSchema.index({ company: 1, status: 1 });

export const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
export default LeaveRequest;
