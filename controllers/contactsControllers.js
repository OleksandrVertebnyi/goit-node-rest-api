import * as contactsServices from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';


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

    console.log('ID:', '[' + id + ']');
    console.log('Length:', id.length);

    const contact = await contactsServices.getContactById(id);
    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const result = await contactsServices.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await contactsServices.removeContact(id);
    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactsServices.updateContact(id, req.body);
    if (!result) {
      return next(HttpError(404, 'Not found'));
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.updateStatusContact(
      contactId,
      req.body
    );

    if (!result) {
      return next(HttpError(404, 'Not found'));
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};









