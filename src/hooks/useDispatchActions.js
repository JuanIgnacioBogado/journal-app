import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

export const useDispatchActions = (actions = {}) => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
