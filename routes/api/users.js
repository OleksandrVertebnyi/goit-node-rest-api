import express from 'express';

import { register, login } from '../../controllers/usersControllers.js';
import validateBody from '../../helpers/validateBody.js';

import { registerSchema, loginSchema } from '../../schemas/usersSchemas.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

export default router;