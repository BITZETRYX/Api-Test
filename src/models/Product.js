const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'PKR' },
    inStock: { type: Boolean, default: true },
    tags: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

productSchema.index({ name: 1, category: 1 });

module.exports = mongoose.model('Product', productSchema);