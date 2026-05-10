import express from 'express';

import {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} from '../controllers/contactsControllers.js';

import validateBody from '../helpers/validateBody.js';

import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';

import auth from '../middlewares/auth.js';

const router = express.Router();

// ВСЕ роуты с auth

router.get('/', auth, getAllContacts);

router.get('/:id', auth, getContactById);

router.post('/', auth, validateBody(createContactSchema), addContact);

router.delete('/:id', auth, removeContact);

router.put('/:id', auth, validateBody(updateContactSchema), updateContact);

router.patch(
  '/:contactId/favorite',
  auth,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

export default router;




