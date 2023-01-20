import {
  logInWithEmailPassword,
  signInWithGoogle
} from '../../../src/firebase/providers';

import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startGoogleSignIn,
  startLogInWithEmailPassword
} from '../../../src/store/auth';

import { demoUser } from '../../fixtures/authFixtures';

// De esta manera se resuelve lo de firebase también
jest.mock('../../../src/firebase/providers');

describe('Auth Thunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should to invoke checkingCredentials', async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toBeCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn should to call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toBeCalledWith(checkingCredentials());
    expect(dispatch).toBeCalledWith(login(loginData));
  });

  test('startGoogleSignIn should to call checkingCredentials and logout', async () => {
    const loginData = { ok: false, errorMessage: 'error' };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toBeCalledWith(checkingCredentials());
    expect(dispatch).toBeCalledWith(logout(loginData));
  });

  test('startLogInWithEmailPassword should to call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await logInWithEmailPassword.mockResolvedValue(loginData);
    await startLogInWithEmailPassword(formData)(dispatch);

    expect(dispatch).toBeCalledWith(checkingCredentials());
    expect(dispatch).toBeCalledWith(login(loginData));
  });

  test('startLogInWithEmailPassword should to call checkingCredentials and logout', async () => {
    const loginData = { ok: false, errorMessage: 'error in login' };
    const formData = { email: demoUser.email, password: '123456' };

    await logInWithEmailPassword.mockResolvedValue(loginData);
    await startLogInWithEmailPassword(formData)(dispatch);

    expect(dispatch).toBeCalledWith(checkingCredentials());
    expect(dispatch).toBeCalledWith(logout(loginData));
  });
});
