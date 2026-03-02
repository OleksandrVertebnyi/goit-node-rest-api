import express from 'express';
import { register } from '../../controllers/usersControllers.js';
import validateBody from '../../helpers/validateBody.js';
import { registerSchema } from '../../schemas/usersSchemas.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

export default router;