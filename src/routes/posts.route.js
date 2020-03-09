import { Router } from 'express';
import PostController from '../controllers/posts.controller';
import auth from '../middleware/auth';

const router = Router();

router.post('/', auth, PostController.createPost);

export default router;
