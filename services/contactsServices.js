import Contact from '../models/contact.js';

export const listContacts = async () => {
  return Contact.find();
};

export const getContactById = async (id) => {
  return Contact.findById(id);
};

export const addContact = async (data) => {
  return Contact.create(data);
};

export const removeContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

export const updateContact = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

export const updateStatusContact = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};








