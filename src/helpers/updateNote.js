import { doc, updateDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const updateNote = async (uid, { id, date, ...note }) => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
  await updateDoc(docRef, note);
};
