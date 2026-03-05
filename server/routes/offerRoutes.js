import { Router } from 'express';
import upload from '../middleware/upload.js';
import {
  createOffer,
  getAllOffers,
  getFullOffer,
  getFavoriteOffers,
  toggleFavorite
} from '../controllers/offerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/', getAllOffers);

router.get('/favorite', getFavoriteOffers);
router.post('/favorite/:offerId/:status', authenticateToken, toggleFavorite);

router.post('/', upload.fields([
  { name: 'previewImage', maxCount: 1 },
  { name: 'photos', maxCount: 6 }
]), createOffer);

router.get('/:id', getFullOffer);

export default router;