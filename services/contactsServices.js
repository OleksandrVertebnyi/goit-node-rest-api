import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const contactsPath = path.resolve('db', 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const getAllContacts = listContacts;

export const getContactById = async (id) => {
  const contacts = await listContacts();
  return contacts.find(c => c.id === id) || null;
};

export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), ...data };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return null;
  const [removed] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return removed;
};

export const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(c => c.id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...data };
  await writeContacts(contacts);
  return contacts[index];
};


