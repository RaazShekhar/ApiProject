const mongoose = require('mongoose');

const { Schema } = mongoose;

const agencySchema = new Schema({
  AgencyId: { type: Number, default: undefined, required: true, unique: true },
  Name: { type: String, default: undefined, required: true },
  Address1: { type: String, default: undefined, required: true },
  Address2: { type: String, default: undefined },
  State: { type: String, default: undefined, required: true },
  City: { type: String, default: undefined, required: true },
  PhoneNumber: { type: Number, default: undefined, required: true },
});

module.exports = mongoose.model('agency', agencySchema);