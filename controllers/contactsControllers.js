import * as contactsServices from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

// ================= GET ALL =================
export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const contacts = await contactsServices.listContacts(owner);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// ================= GET BY ID =================
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const contact = await contactsServices.getContactById(id, owner);

    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// ================= CREATE =================
export const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;

    const result = await contactsServices.addContact({
      ...req.body,
      owner,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// ================= DELETE =================
export const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const contact = await contactsServices.removeContact(id, owner);

    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE =================
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const result = await contactsServices.updateContact(
      id,
      req.body,
      owner
    );

    if (!result) {
      return next(HttpError(404, 'Not found'));
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE FAVORITE =================
export const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    const result = await contactsServices.updateStatusContact(
      contactId,
      req.body,
      owner
    );

    if (!result) {
      return next(HttpError(404, 'Not found'));
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};








