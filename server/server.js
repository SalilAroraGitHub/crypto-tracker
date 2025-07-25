import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import coinRoutes from './routes/coinRoutes.js';
import cors from 'cors';
import './cron/cronJob.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: '*', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());


// ✅ Root Route
app.get('/', (req, res) => {
  res.send('Server is running successfully ✅');
});

// Connect DB
connectDB();

// Routes
app.use('/api', coinRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
