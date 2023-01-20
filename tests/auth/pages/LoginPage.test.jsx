import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, fireEvent } from '@testing-library/react';

import { authSlice } from '../../../src/store/auth';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { notAuthenticatedState as auth } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLogInWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLogInWithEmailPassword: formState => () => mockStartLogInWithEmailPassword(formState)
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => fn => fn()
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: { auth }
});

describe('Login Page', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should to show component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/login/i).length).toBeGreaterThanOrEqual(1);
  });

  test('should to show call starGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const btn = screen.getByRole('button', { name: /google/i });
    fireEvent.click(btn);
    expect(mockStartGoogleSignIn).toBeCalled();
  });

  test('should to show call with startLogInWithEmailPassword with email and password', () => {
    const email = 'nacho@gmail.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const btn = screen.getByRole('button', { name: /login/i });
    const inputEmail = screen.getByPlaceholderText(/correo@google.com/i);
    const inputPassword = screen.getByPlaceholderText(/contraseña/i);

    fireEvent.input(inputEmail, { target: { value: email } });
    fireEvent.input(inputPassword, { target: { value: password } });
    fireEvent.click(btn);

    expect(mockStartLogInWithEmailPassword).toHaveBeenCalledWith({
      email,
      password
    });
  });
});
