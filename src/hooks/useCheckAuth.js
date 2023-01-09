import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FirebaseAuth } from '../firebase/config';
import { useDispatchAuth } from '../store/auth';

export const useCheckAuth = () => {
  const { status } = useSelector(({ auth }) => auth);
  const { login, logout } = useDispatchAuth();

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(async user => {
      if (!user) return logout();
      const { uid, email, displayName, photoURL } = user;
      login({ uid, email, displayName, photoURL });
    });
  }, []);

  return status;
};
