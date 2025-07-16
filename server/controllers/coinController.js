import axios from 'axios';
import Coin from '../models/Coins.js';
import History from '../models/History.js';

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

// Periodically fetch and save to DB every 5 minutes
export const fetchAndStoreCoins = async () => {
  try {
    const { data } = await axios.get(API_URL);

    const formatted = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      lastUpdated: coin.last_updated,
    }));

    await Coin.deleteMany({});
    await Coin.insertMany(formatted);

    console.log('✅ Coin data updated and saved in MongoDB');
  } catch (err) {
    console.error('❌ Error fetching coins from CoinGecko:', err.message);
  }
};

// Always serve from MongoDB (cached data)
export const getCoins = async (req, res) => {
  try {
    const coins = await Coin.find({});
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coins from DB' });
  }
};

//  Still calls CoinGecko directly — optional: disable this if needed
export const postHistory = async (req, res) => {
  try {
    const { data } = await axios.get(API_URL);

    const formatted = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      lastUpdated: coin.last_updated,
    }));

    await History.insertMany(formatted);

    res.json({ message: 'History data saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save history data' });
  }
};

// ✅ Get history by coinId
export const getHistoryByCoin = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await History.find({ coinId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
