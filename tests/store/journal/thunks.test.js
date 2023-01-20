import { collection, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  startNewNote
} from '../../../src/store/journal';

describe('Journal Thunks', () => {
  const dispatch = jest.fn();
  const gestState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should to create a new note', async () => {
    const uid = 'TEST-UID';
    const bodyNote = {
      body: '',
      title: '',
      imageUrls: [],
      id: expect.any(String),
      date: expect.any(String)
    };

    gestState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, gestState);

    expect(dispatch).toBeCalledWith(savingNewNote());
    expect(dispatch).toBeCalledWith(addNewEmptyNote(bodyNote));
    expect(dispatch).toBeCalledWith(setActiveNote(bodyNote));

    // delete all notes from firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const { docs } = await getDocs(collectionRef);
    await Promise.all(docs.map(({ ref }) => deleteDoc(ref)));
  });
});
