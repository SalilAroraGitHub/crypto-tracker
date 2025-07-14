import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  lastUpdated: Date,
});

export default mongoose.model('Coin', coinSchema);
