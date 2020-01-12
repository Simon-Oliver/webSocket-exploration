const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    orderFrom: { type: String },
    tableNum: { type: String },
    orderItems: { type: Array },
    notes: { type: String },
    orderIn: { type: Date },
    orderOut: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
