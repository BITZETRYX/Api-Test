const mongoose = require('mongoose');
const config = require('../src/config/env');
const Product = require('../src/models/Product');

const products = [
  {
    name: 'Fresh Beef Steak',
    category: 'Fresh Meat',
    description: 'Premium halal beef steaks, vacuum packed.',
    price: 1500,
    currency: 'PKR',
    tags: ['halal', 'beef']
  },
  {
    name: 'Fresh Chicken Breast',
    category: 'Fresh Meat',
    description: 'Boneless halal chicken breast.',
    price: 800,
    currency: 'PKR',
    tags: ['halal', 'chicken']
  },
  {
    name: 'Mutton Chops',
    category: 'Halal Products',
    description: 'Tender halal mutton chops.',
    price: 1800,
    currency: 'PKR',
    tags: ['halal', 'mutton']
  },
  {
    name: 'Cumin Seeds',
    category: 'Spices',
    description: 'Whole cumin seeds, aromatic and fresh.',
    price: 250,
    currency: 'PKR',
    tags: ['spices']
  },
  {
    name: 'Turmeric Powder',
    category: 'Spices',
    description: 'Pure turmeric powder, bright color.',
    price: 200,
    currency: 'PKR',
    tags: ['spices']
  }
];

const seed = async () => {
  if (!config.mongoUri) {
    console.error('Missing MONGO_URI in environment.');
    process.exit(1);
  }

  await mongoose.connect(config.mongoUri);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products:', products.length);
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});