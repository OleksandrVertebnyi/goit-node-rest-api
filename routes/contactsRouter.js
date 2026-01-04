import express from "express";

import {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", validateBody(createContactSchema), addContact);
router.delete("/:id", removeContact);
router.put("/:id", validateBody(updateContactSchema), updateContact);

export default router;



