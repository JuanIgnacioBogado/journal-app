import { doc, setDoc, collection } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const saveNewNote = async (uid, newNote) => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
  await setDoc(newDoc, newNote);

  return newDoc.id;
};
