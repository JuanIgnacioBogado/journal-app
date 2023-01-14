import {
  deleteNote,
  fileUpload,
  formatDate,
  loadNotes,
  saveNewNote,
  updateNote
} from '../../helpers';

import {
  addNewEmptyNote,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving
} from './journalSlice';

export const startNewNote = () => async (dispatch, getState) => {
  dispatch(savingNewNote());
  const { uid } = getState().auth;
  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    imageUrls: []
  };

  const id = await saveNewNote(uid, newNote);

  newNote.id = id;
  newNote.date = formatDate(newNote.date);

  dispatch(addNewEmptyNote(newNote));
  dispatch(setActiveNote(newNote));
};

export const startLoadingNotes = () => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const notes = await loadNotes(uid);
  dispatch(setNotes(notes));
};

export const startSaveNote = () => async (dispatch, getState) => {
  dispatch(setSaving());
  const {
    auth: { uid },
    journal: { active: note }
  } = getState();

  await updateNote(uid, note);
  dispatch(noteUpdated(note));
};

export const startUploadLoadingFiles = files => async dispatch => {
  dispatch(setSaving());

  const photosUrls = await Promise.all([...files].map(fileUpload));
  dispatch(setPhotosToActiveNote(photosUrls));
  dispatch(startSaveNote());
};

export const startDeletingNote = () => async (dispatch, getState) => {
  dispatch(setSaving());
  const {
    auth: { uid },
    journal: { active: note }
  } = getState();

  await deleteNote(uid, note.id);
  dispatch(deleteNoteById(note.id));
};
