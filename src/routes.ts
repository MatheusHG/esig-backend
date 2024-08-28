import { Router } from 'express';
import UserController from './app/controllers/UserController';
import UserTypeController from './app/controllers/UserTypeController';
import authMiddleware from './middlewares/auth';
import ProjectController from './app/controllers/ProjectController';
import TaskController from './app/controllers/TaskController';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

const router = Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

router.post('/user/create', UserController.create);
router.post('/user/authenticate', UserController.login);

router.use(authMiddleware);

router.get('/user/:id', UserController.findById);
router.get('/user', UserController.findByAll);

router.post('/type/create', UserTypeController.create);
router.get('/type', UserTypeController.findAll);

router.post('/project', ProjectController.create);
router.get('/project', ProjectController.findAll);

router.post('/project/task', upload.single('file'), TaskController.create);

export default router;