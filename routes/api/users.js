import express from 'express';
import upload from '../../middlewares/upload.js';

import {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,       // Додано імпорт
  verifyEmail,
  resendVerifyEmail,  // Додано імпорт для Кроку 4
} from '../../controllers/usersControllers.js';

import validateBody from '../../helpers/validateBody.js';

import {
  registerSchema,
  loginSchema,
  // Якщо у тебе є схема валідації для емейлу (наприклад, emailSchema), імпортуй її сюди
} from '../../schemas/usersSchemas.js';

import auth from '../../middlewares/auth.js';

const router = express.Router();

// Реєстрація та логін
router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrent);

// Верифікація емейлу (Крок 2 та 4 з ДЗ)
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', resendVerifyEmail); // Додано ендпоінт повторної відправки!

// Оновлення аватарки (Попереднє ДЗ)
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  updateAvatar
);

export default router;