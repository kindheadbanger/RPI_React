import { Router } from 'express';
import upload from '../middleware/upload.js';
import { registration } from '../controllers/userController.js';

const router = new Router();

router.post('/users', upload.single('avatar'), registration);

export default router;