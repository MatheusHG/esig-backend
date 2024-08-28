import { Router } from 'express';
import UserController from './app/controllers/UserController';
import UserTypeController from './app/controllers/UserTypeController';
import authMiddleware from './middlewares/auth';
import ProjectController from './app/controllers/ProjectController';
import TaskController from './app/controllers/TaskController';
import multer from 'multer';
import uploadConfig from './config/upload';

const router = Router();
const upload = multer(uploadConfig);

router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

router.post('/user/create', UserController.create);
router.post('/user/authenticate', UserController.login);

router.use(authMiddleware);

router.get('/user/:id', UserController.findById);
router.post('/type/create', UserTypeController.create);
router.get('/type', UserTypeController.findAll);

router.post('/project', ProjectController.create);
router.get('/project', ProjectController.findAll);

router.post('/project/task', upload.single('file'), TaskController.create);

export default router;