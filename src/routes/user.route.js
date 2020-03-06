import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();
/**
 * Create users (POST)
 */
router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);

export default router;
