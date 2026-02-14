import { Router } from 'express';
import offerRouter from './offerRoutes.js';

const router = new Router();

router.use('/offers', offerRouter);

export default router;