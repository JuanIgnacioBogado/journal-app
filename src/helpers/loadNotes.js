import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

import { formatDate } from './formatDate';

export const loadNotes = async uid => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const { docs } = await getDocs(query(collectionRef, orderBy('date', 'desc')));

  return docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: formatDate(doc.data().date)
  }));
};
