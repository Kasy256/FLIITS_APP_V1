import { Schema, model as _model, Types } from 'mongoose';

const carSchema = new Schema({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  licensePlate: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  carDescription: { type: String },
  availabilityDays: { type: [String], default: [] },
  availabilityHours: { type: [String], default: [] },
  seats: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  features: { type: [String], default: [] },
  dailyRate: { type: Number, required: true, default: 0 },
  weeklyRate: { type: Number, required: true, default: 0 },
  monthlyRate: { type: Number, required: true, default: 0 },
  securityDeposit: { type: Number, required: true, default: 0 },
  extraMileageFee: { type: Number, required: true, default: 0 },
  lateReturnFee: { type: Number, required: true, default: 0 },
  cleaningFee: { type: Number, required: true, default: 0 },
  renterConditions: { type: Schema.Types.Mixed },  // Allows both string and array
  goals: { type: String },
  additionalInfo: { type: [String] },
  carPhotos: {
    frontView: { type: String },
    rearView: { type: String },
    leftSideView: { type: String },
    rightSideView: { type: String },
    frontInterior: { type: String },
    backInterior: { type: String },
  },
});

const Car = _model('Car', carSchema);

export default Car;
