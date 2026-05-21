

import express from 'express';
import upload from '../../middlewares/upload.js';
import { updateAvatar } from '../../controllers/usersControllers.js';

import {
  register,
  login,
  logout,
  getCurrent,
} from '../../controllers/usersControllers.js';

import validateBody from '../../helpers/validateBody.js';

import {
  registerSchema,
  loginSchema,
} from '../../schemas/usersSchemas.js';

import auth from '../../middlewares/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', auth, logout);

router.get('/current', auth, getCurrent);

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  updateAvatar
);

export default router;