import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import applicationRoutes from './routes/applicationRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(helmet());

// Frontend domaininize izin verin
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// Saniyede çok fazla form gönderilmesini engelle (Spam koruması)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP başına limit
  message: {
    success: false,
    message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.'
  }
});
app.use('/api', limiter);

// Ana API Rotaları
app.use('/api/applications', applicationRoutes);

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'BERLINER API ist online.' });
});

// Bulunamayan Rotalar (404)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route nicht gefunden.' });
});

// Global Hata Yakalayıcı (En sonda olmalı)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});