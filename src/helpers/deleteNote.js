import { doc, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const deleteNote = async (uid, idNote) => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const docRef = doc(FirebaseDB, `${uid}/journal/notes/${idNote}`);
  await deleteDoc(docRef);
};
