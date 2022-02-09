const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema({
  ClientId: { type: Number, default: undefined, required: true, unique: true },
  AgencyId: { type: Number, default: undefined, required: true },
  Name: { type: String, default: undefined, required: true },
  Email: { type: String, default: undefined, required: true },
  PhoneNumber: { type: Number, default: undefined, required: true },
  TotalBill: { type: Number, default: undefined, required: true },
});

module.exports = mongoose.model('client', clientSchema);