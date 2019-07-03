import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/meetups', authMiddleware, MeetupController.store);
routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

routes.put('/users', authMiddleware, UserController.update);

export default routes;
