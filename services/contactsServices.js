import Contact from '../models/contact.js';


export const listContacts = async (owner) => {
  return Contact.find({ owner });
};


export const getContactById = async (id, owner) => {
  return Contact.findOne({ _id: id, owner });
};


export const addContact = async (data) => {
  return Contact.create(data);
};


export const removeContact = async (id, owner) => {
  return Contact.findOneAndDelete({ _id: id, owner });
};


export const updateContact = async (id, data, owner) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    data,
    { new: true }
  );
};


export const updateStatusContact = async (id, data, owner) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    data,
    { new: true }
  );
};





