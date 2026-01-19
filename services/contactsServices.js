import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const contactsPath = path.resolve('db', 'contacts.json');

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === id) || null;
};

export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) return null;

  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

export const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);

  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};






