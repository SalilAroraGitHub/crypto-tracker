import express from 'express';
import {
  getCoins,
  postHistory,
  getHistoryByCoin,
} from '../controllers/coinController.js';

const router = express.Router();

router.get('/coins', getCoins);
router.post('/history', postHistory);
router.get('/history/:coinId', getHistoryByCoin);

export default router;
