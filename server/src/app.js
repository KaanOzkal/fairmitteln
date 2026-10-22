import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import applicationRoutes from './routes/applicationRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// ==========================================
// GÜVENLİK
// ==========================================

app.use(helmet());

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'https://fairmitteln.onrender.com',
    methods: ['GET', 'POST'],
  })
);

// ==========================================
// JSON
// ==========================================

app.use(express.json());

// ==========================================
// RATE LIMIT
// ==========================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,

  message: {
    success: false,
    message:
      'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
  },
});

app.use('/api', limiter);

// ==========================================
// ANA ROUTE
// ==========================================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BERLINER API ist online.',
  });
});

// ==========================================
// API ROUTES
// ==========================================

app.use('/api/applications', applicationRoutes);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BERLINER API ist online.',
  });
});

// ==========================================
// 404 - ROUTE BULUNAMADI
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route nicht gefunden.',
  });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use(errorHandler);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});