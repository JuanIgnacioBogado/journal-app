import {
  registerUserWithEmailPassword,
  logInWithEmailPassword,
  signInWithGoogle
} from '../../firebase/providers';

import { checkingCredentials, login, logout } from './';

const handleDispatch = (dispatch, res) => {
  if (!res.ok) return dispatch(logout(res));

  dispatch(login(res));
};

export const checkingAuthentication = () => async dispatch => {
  dispatch(checkingCredentials());
};

export const startGoogleSignIn = () => async dispatch => {
  dispatch(checkingCredentials());
  const res = await signInWithGoogle();

  handleDispatch(dispatch, res);
};

export const startCreatingUserWithEmailPassword = formState => async dispatch => {
  dispatch(checkingCredentials());
  const res = await registerUserWithEmailPassword(formState);

  handleDispatch(dispatch, res);
};

export const startLogInWithEmailPassword = formState => async dispatch => {
  dispatch(checkingCredentials());
  const res = await logInWithEmailPassword(formState);

  handleDispatch(dispatch, res);
};
