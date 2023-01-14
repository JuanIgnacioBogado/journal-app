import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import * as thunks from './thunks';
import { journalSlice } from './journalSlice';

export const useDispatchJournal = () => {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...thunks,
          ...journalSlice.actions
        },
        dispatch
      ),
    []
  );
};
