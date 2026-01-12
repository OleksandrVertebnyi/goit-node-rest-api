import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error); 
  }
};


export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getContactById(id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};


export const addContact = async (req, res, next) => {
  try {
    const newContact = await contactsServices.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};


export const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await contactsServices.removeContact(id);

    if (!removedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
};


export const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { id } = req.params;
    const updatedContact = await contactsServices.updateContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};






