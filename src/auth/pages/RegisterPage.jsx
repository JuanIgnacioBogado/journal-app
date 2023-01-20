import { useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinkMaterial from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { useDispatchAuth, useSelectorAuth } from '../../store/auth';

const formData = {
  displayName: '',
  email: '',
  password: ''
};

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formValidations = {
  email: [value => emailRegex.test(value), 'El correo es inválido'],
  password: [
    value => value.length >= 6,
    'El password debe de tener al menos 6 caracteres'
  ],
  displayName: [value => value.trim(), 'El nombre es obligatorio']
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    formState,
    displayName,
    email,
    password,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
    handleInputChange
  } = useForm(formData, formValidations);

  const { startCreatingUserWithEmailPassword } = useDispatchAuth();
  const { isCheckingAuthenticating, errorMessage } = useSelectorAuth();

  const handleSubmit = e => {
    e.preventDefault();

    setFormSubmitted(true);
    if (!isFormValid) return;

    startCreatingUserWithEmailPassword(formState);
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={handleInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={formSubmitted && displayNameValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted && emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={formSubmitted && passwordValid}
            />
          </Grid>

          {errorMessage && (
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isCheckingAuthenticating}
          >
            Crear Cuenta
          </Button>

          <Grid container justifyContent="end">
            <Typography mr={1}>¿Ya tienes cuenta?</Typography>
            <LinkMaterial component={Link} to="/auth/login">
              Ingresar
            </LinkMaterial>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
