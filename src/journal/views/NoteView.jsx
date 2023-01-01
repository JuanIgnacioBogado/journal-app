import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import SaveOutlined from '@mui/icons-material/SaveOutlined';

import { ImageGallery } from '../components';

export const NoteView = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" mb={1}>
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          28 de agosto, 2023
        </Typography>
      </Grid>

      <Grid item>
        <Button color="primary" startIcon={<SaveOutlined />} sx={{ p: 2 }}>
          Guardar
        </Button>
      </Grid>

      <Grid container gap={2}>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¡Qué sucedió en el día de hoy?"
          minRows={5}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
