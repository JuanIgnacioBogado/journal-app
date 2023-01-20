import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSelectorAuth = () => {
  const { status, ...state } = useSelector(({ auth }) => auth);

  const isCheckingAuthenticating = useMemo(
    () => status === 'checking',
    [status]
  );

  return {
    ...state,
    isCheckingAuthenticating
  };
};
