import mongoose from 'mongoose';
import { EMPLOYMENT_STATUS_LIST, EMPLOYMENT_STATUS } from '../config/constants.js';

const employeeSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    employeeCode: {
      type: String,
      required: [true, 'Employee code is required'],
      trim: true,
      uppercase: true,
      maxlength: 30,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Employee email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    joiningDate: {
      type: Date,
      required: [true, 'Joining date is required'],
    },
    exitDate: {
      type: Date,
      default: null,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Department is required'],
      index: true,
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designation',
      required: [true, 'Designation is required'],
      index: true,
    },
    employmentStatus: {
      type: String,
      enum: EMPLOYMENT_STATUS_LIST,
      default: EMPLOYMENT_STATUS.FULL_TIME,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    bankDetails: {
      accountTitle: { type: String, trim: true, default: '' },
      accountNumber: { type: String, trim: true, default: '' },
      bankName: { type: String, trim: true, default: '' },
      iban: { type: String, trim: true, default: '' },
    },
    emergencyContact: {
      name: { type: String, trim: true, default: '' },
      relationship: { type: String, trim: true, default: '' },
      phone: { type: String, trim: true, default: '' },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

employeeSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

employeeSchema.index({ company: 1, employeeCode: 1 }, { unique: true });
employeeSchema.index({ company: 1, email: 1 }, { unique: true });
employeeSchema.index({ firstName: 'text', lastName: 'text', employeeCode: 'text', email: 'text' });

export const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
