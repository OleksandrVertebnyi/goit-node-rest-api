import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  return await readContacts();
};

export const getContactById = async (id) => {
  const contacts = await readContacts();
  return contacts.find((item) => item.id === id);
};

export const addContact = async (data) => {
  const contacts = await readContacts();
  const newContact = { id: nanoid(), ...data };

  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
};

export const removeContact = async (id) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) return null;

  const [removedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);

  return removedContact;
};

export const updateContact = async (id, data) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...data };
  await writeContacts(contacts);

  return contacts[index];
};

