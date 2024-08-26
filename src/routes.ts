import { Router } from 'express';
import UserController from './app/controllers/UserController';
import UserTypeController from './app/controllers/UserTypeController';

const router = Router();

router.post('/', UserController.handle);
router.post('/create-type', UserTypeController.handle);

export default router;