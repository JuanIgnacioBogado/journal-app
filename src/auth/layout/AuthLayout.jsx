import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const AuthLayout = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="primary.main"
      p={4}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        width={{ md: 450 }}
        backgroundColor="white"
        p={3}
        borderRadius={2}
      >
        <Typography variant="h5" mb={2}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
