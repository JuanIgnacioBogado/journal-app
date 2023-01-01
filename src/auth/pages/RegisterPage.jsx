import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LinkMaterial from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear Cuenta">
      <form>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
            />
          </Grid>

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

          <Button variant="contained" fullWidth>
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
