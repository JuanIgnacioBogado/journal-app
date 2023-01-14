import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import StarOutline from '@mui/icons-material/StarOutline';

export const NothingSelectedView = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    minHeight="calc(100vh - 55%)"
    backgroundColor="primary.main"
    borderRadius={3}
    className="animate__animated animate__fadeIn animate__faster"
  >
    <Grid item xs={12}>
      <StarOutline sx={{ fontSize: 100, color: 'white' }} />
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h5" color="white">
        Selecciona o crea una entrada
      </Typography>
    </Grid>
  </Grid>
);
