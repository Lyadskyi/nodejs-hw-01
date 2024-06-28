// import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact';
import path from 'path';
import fs from 'node:fs/promises';

// const generateContacts = async (number) => {};

// generateContacts(5);

export const generateContacts = async (numberOfContacts) => {
  const dbPath = path.resolve(__dirname, '../db/db.json');

  try {
    // Читання існуючих контактів з файлу
    let contacts = [];
    if (
      await fs
        .access(dbPath)
        .then(() => true)
        .catch(() => false)
    ) {
      const data = await fs.readFile(dbPath, 'utf8');
      contacts = JSON.parse(data);
    }

    // Створення нових контактів
    for (let i = 0; i < numberOfContacts; i++) {
      contacts.push(createFakeContact());
    }

    // Запис оновлених контактів у файл
    await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2), 'utf8');
    console.log('Contacts generated successfully');
  } catch (err) {
    console.error('Error generating contacts:', err);
  }
};
