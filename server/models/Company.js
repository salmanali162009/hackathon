import mongoose from 'mongoose';
import { DEFAULT_COMPANY_SETTINGS } from '../config/constants.js';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: 120,
    },
    legalName: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    settings: {
      officeStartTime: {
        type: String,
        default: DEFAULT_COMPANY_SETTINGS.officeStartTime,
      },
      gracePeriodMinutes: {
        type: Number,
        default: DEFAULT_COMPANY_SETTINGS.gracePeriodMinutes,
        min: 0,
        max: 120,
      },
      halfDayHours: {
        type: Number,
        default: DEFAULT_COMPANY_SETTINGS.halfDayHours,
        min: 1,
        max: 12,
      },
      weekendDays: {
        type: [Number],
        default: DEFAULT_COMPANY_SETTINGS.weekendDays,
      },
      geofence: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
        radiusMeters: { type: Number, default: 500 },
      },
    },
    isInitialized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'companies',
  }
);

export const Company = mongoose.model('Company', companySchema);
export default Company;
