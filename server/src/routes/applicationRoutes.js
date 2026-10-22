import express from 'express';
import multer from 'multer'; // FormData kargo paketini açacak olan araç!
import { submitApplication } from '../controllers/applicationController.js';
import { validateApplication } from '../validators/applicationValidator.js';

const router = express.Router();

// Multer Ayarı: Gelen dosyaları ve form datalarını geçici olarak hafızaya (RAM) alır,
// böylece req.body okunabilir hale gelir.
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/applications
// DİKKAT SIRALAMA: Önce 'upload' kargoyu açar, sonra 'validate' kontrol eder, en son 'submit' kaydeder!
router.post('/', upload.single('document'), validateApplication, submitApplication);

export default router;