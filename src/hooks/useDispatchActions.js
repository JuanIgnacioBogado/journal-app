import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import * as authThunks from '../store/auth/thunks';
import * as journalThunks from '../store/journal/thunks';

import { authSlice } from '../store/auth';
import { journalSlice } from '../store/journal';

export const useDispatchActions = (actions = {}) => {
  const dispatch = useDispatch();
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...authThunks,
          ...journalThunks,
          ...authSlice.actions,
          ...journalSlice.actions
        },
        dispatch
      ),
    []
  );
};
