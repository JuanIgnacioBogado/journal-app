import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

const handleError = error => ({
  ...error,
  ok: false,
  errorMessage: error.message
});

export const signInWithGoogle = async () => {
  try {
    const {
      user: { uid, photoURL, displayName, email }
    } = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    };
  } catch (error) {
    return handleError(error);
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName
}) => {
  try {
    const {
      user: { photoURL, uid }
    } = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    };
  } catch (error) {
    return handleError(error);
  }
};

export const logInWithEmailPassword = async ({ email, password }) => {
  try {
    const {
      user: { uid, photoURL, displayName }
    } = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email
    };
  } catch (error) {
    return handleError(error);
  }
};

export const logoutFirebase = async () => await FirebaseAuth.signOut();
