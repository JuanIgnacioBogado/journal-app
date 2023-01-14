import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    savingNewNote: state => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.unshift(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
      state.messageSaved = '';
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: state => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    noteUpdated: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map(note =>
        note.id === payload.id ? payload : note
      );
      state.messageSaved = `<b>"${payload.title}"</b> <br> actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
    clearNotesLogout: state => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.filter(note => note.id !== payload);
      state.active = null;
    }
  }
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving
} = journalSlice.actions;
