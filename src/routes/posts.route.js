import { Router } from 'express';
import PostController from '../controllers/posts.controller';
import auth from '../middleware/auth';
import multer from '../middleware/multer';

const router = Router();

router.post('/', [auth, multer.array('postImages')], PostController.createPost);
router.get('/', auth, PostController.getAllPosts);
router.get('/all', PostController.getPosts);
router.get('/:id', PostController.getPostById);
router.patch(
  '/:id',
  [auth, multer.array('postImages')],
  PostController.updatePost,
);
router.delete('/:id', auth, PostController.deletePost);

export default router;
