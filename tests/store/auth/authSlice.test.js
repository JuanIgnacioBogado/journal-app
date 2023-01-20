import {
  authSlice,
  checkingCredentials,
  login,
  logout
} from '../../../src/store/auth/authSlice';

import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState
} from '../../fixtures/authFixtures';

describe('authSlice', () => {
  test('should to return initialState and called auth', () => {
    expect(authSlice.name).toBe('auth');
    expect(authSlice.getInitialState()).toEqual(initialState);

    // También se puede hacer así:
    // const state = authSlice.reducer(initialState, {});
    // expect(state).toEqual(initialState);
  });

  test('should do the authentication', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authenticatedState);
  });

  test('should do the logout without errorMessage', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('should do the logout with errorMessage', () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage: 'error msg' })
    );
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: 'error msg'
    });
  });

  test('should do change state to checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
  });
});
