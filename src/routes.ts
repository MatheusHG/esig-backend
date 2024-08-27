import { Router } from 'express';
import UserController from './app/controllers/UserController';
import UserTypeController from './app/controllers/UserTypeController';
import authMiddleware from './middlewares/auth';

const router = Router();

router.post('/user/create', UserController.create);
router.post('/user/authenticate', UserController.login);

router.use(authMiddleware);

router.get('/user/:id', UserController.findById);
router.post('/type/create', UserTypeController.handle);
router.get('/type', UserTypeController.findAll);

export default router;