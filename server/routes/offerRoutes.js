import { Router } from 'express';
import { getAllOffers, getFullOffer } from '../controllers/offerController.js';

const router = new Router();

router.get('/offers', getAllOffers);
router.get('/offers/:id', getFullOffer);

export default router;