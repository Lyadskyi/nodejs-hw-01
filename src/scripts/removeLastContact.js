import fs from 'fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const removeLastContact = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf-8');
    const contacts = JSON.parse(data);

    if (contacts.length === 0) {
      console.log('The contact array is empty, there is nothing to delete!');
      return;
    }

    contacts.pop();

    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf-8');
    console.log('The last contact was successfully deleted!');
  } catch (error) {
    console.error('Error processing contacts:', error);
  }
};

await removeLastContact();
