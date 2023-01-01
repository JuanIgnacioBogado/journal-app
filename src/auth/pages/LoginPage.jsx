import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinkMaterial from '@mui/material/Link';
import TextField from '@mui/material/TextField';

import Google from '@mui/icons-material/Google';

import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              autoComplete="false"
              fullWidth
            />
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth startIcon={<Google />}>
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
