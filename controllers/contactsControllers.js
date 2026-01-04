import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();
  res.status(200).json(contacts);
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsServices.getContactById(id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(contact);
};

export const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await contactsServices.addContact(
    name,
    email,
    phone
  );

  res.status(201).json(newContact);
};

export const removeContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await contactsServices.removeContact(id);

  if (!removedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(removedContact);
};

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const updatedContact = await contactsServices.updateContact(id, req.body);

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};





