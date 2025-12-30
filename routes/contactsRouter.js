import express from "express";
import * as controllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const router = express.Router();

router.get("/", controllers.getAllContacts);
router.get("/:id", controllers.getContact);
router.delete("/:id", controllers.deleteContact);
router.post("/", validateBody(addContactSchema), controllers.createContact);
router.put("/:id", validateBody(updateContactSchema), controllers.updateContact);

export default router;
