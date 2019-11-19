const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    price: { type: Number, required: true },
    options: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', MenuItemSchema);
