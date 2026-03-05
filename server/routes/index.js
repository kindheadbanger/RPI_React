import { Router } from 'express';
import offerRoutes from './offerRoutes.js';
import userRoutes from './userRoutes.js';
import reviewRoutes from './reviewRoutes.js';

const router = new Router();

router.use('/offers', offerRoutes);
router.use('/reviews', reviewRoutes);
router.use('/', userRoutes);

export default router;