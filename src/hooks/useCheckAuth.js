import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FirebaseAuth } from '../firebase/config';
import { useDispatchActions } from '../hooks/useDispatchActions';

export const useCheckAuth = () => {
  const { status } = useSelector(({ auth }) => auth);
  const { login, logout, clearNotesLogout, startLoadingNotes } = useDispatchActions();

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(async user => {
      if (!user) {
        logout();
        clearNotesLogout();
        return;
      }
      const { uid, email, displayName, photoURL } = user;
      login({ uid, email, displayName, photoURL });
      startLoadingNotes();
    });
  }, []);

  return status;
};
