import axios from 'axios';
import Coin from '../models/Coins.js';
import History from '../models/History.js';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 60 }); // cache lasts 60 seconds

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

// export const getCoins = async (req, res) => {
//   try {
//     const { data } = await axios.get(API_URL);
//     await Coin.deleteMany({});

//     const formatted = data.map((coin) => ({
//       coinId: coin.id,
//       name: coin.name,
//       symbol: coin.symbol,
//       price: coin.current_price,
//       marketCap: coin.market_cap,
//       change24h: coin.price_change_percentage_24h,
//       lastUpdated: coin.last_updated,
//     }));

//     await Coin.insertMany(formatted);

//     res.json(formatted);
//   } catch (err) {
//   console.error('Error fetching from CoinGecko API:', err.message);
//   res.status(500).json({ error: 'Failed to fetch coins', details: err.message });
// }
// };
export const getCoins = async (req, res) => {
  try {
    const cachedData = cache.get("coins");

    if (cachedData) {
      console.log("Serving from cache 🚀");
      return res.json(cachedData);
    }

    const { data } = await axios.get(API_URL);
    await Coin.deleteMany({});

    const formatted = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      lastUpdated: coin.last_updated,
    }));

    await Coin.insertMany(formatted);

    cache.set("coins", formatted); // Save result to cache
    console.log("Fetched from API & cached ✅");

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching coins:', err.message || err);
    if (err.response) {
      console.error('Response data:', err.response.data);
      console.error('Response status:', err.response.status);
    }
    res.status(500).json({ error: 'Failed to fetch coins', details: err.message });
  }
};



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

export const getHistoryByCoin = async (req, res) => {
  try {
    const { coinId } = req.params;
    const history = await History.find({ coinId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
