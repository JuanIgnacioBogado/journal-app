import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinkMaterial from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import Google from '@mui/icons-material/Google';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { useDispatchAuth } from '../../store/auth';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const { email, password, formState, handleInputChange } = useForm(formData);
  const { startLogInWithEmailPassword, startGoogleSignIn } = useDispatchAuth();
  const { status, errorMessage } = useSelector(({ auth }) => auth);
  const isCheckingAuthenticating = useMemo(() => status === 'checking', [status]);

  const handleSubmit = e => {
    e.preventDefault();

    if (Object.values(formState).some(v => !v.trim())) return;

    startLogInWithEmailPassword(formState);
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              autoComplete="false"
              fullWidth
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Grid>

          {errorMessage && (
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthenticating}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Google />}
                onClick={startGoogleSignIn}
                disabled={isCheckingAuthenticating}
              >
                Google
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="end">
            <LinkMaterial component={Link} to="/auth/register">
              Crear una cuenta
            </LinkMaterial>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
