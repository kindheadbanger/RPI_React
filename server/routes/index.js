import { Router } from 'express';
import offerRoutes from './offerRoutes.js';
import userRoutes from './userRoutes.js';
import reviewRoutes from './reviewRoutes.js';

const router = new Router();

router.use('/', offerRoutes);
router.use('/', userRoutes);
router.use('/', reviewRoutes);

export default router;