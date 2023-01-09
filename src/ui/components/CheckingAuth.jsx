import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="primary.main"
      p={4}
    >
      <CircularProgress color="warning" size={100} />
    </Grid>
  );
};
