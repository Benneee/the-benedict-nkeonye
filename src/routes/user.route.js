import { Router } from 'express';
import UserController from '../controllers/user.controller';
import auth from '../middleware/auth';

const router = Router();
/**
 * Create users (POST)
 */
router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/logout', auth, UserController.logoutUser);
router.post('/logoutAll', auth, UserController.logoutUserAll);
router.get('/profile', auth, UserController.getUserProfile);

export default router;
