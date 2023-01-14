import { useEffect } from 'react';
import Swal from 'sweetalert2';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import DeleteOutline from '@mui/icons-material/DeleteOutline';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import UploadOutlined from '@mui/icons-material/UploadOutlined';

import { ImageGallery } from '../components';

import { useForm } from '../../hooks';
import { useDispatchJournal, useSelectorJournal } from '../../store/journal';

export const NoteView = () => {
  const {
    setActiveNote,
    startSaveNote,
    startUploadLoadingFiles,
    startDeletingNote
  } = useDispatchJournal();
  const { active: note, messageSaved, isSaving } = useSelectorJournal();
  const { title = '', body = '', formState, handleInputChange } = useForm(note);

  const onFileInputChange = ({ target: { files } }) => {
    if (!files.length) return;

    startUploadLoadingFiles(files);
  };

  useEffect(() => {
    setActiveNote(formState);
  }, [formState]);

  useEffect(() => {
    if (messageSaved) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);

  return (
    <Grid
      container
      mb={1}
      gap={2}
      justifyContent="space-between"
      alignItems="center"
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39}>{note.date}</Typography>
      </Grid>

      <Grid item>
        <IconButton
          color="primary"
          disabled={isSaving}
          component="label"
          sx={{ p: 2 }}
        >
          <input
            style={{ display: 'none' }}
            type="file"
            multiple
            onChange={onFileInputChange}
          />
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          color="primary"
          startIcon={<SaveOutlined />}
          sx={{ p: 2 }}
          onClick={startSaveNote}
        >
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
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¡Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={startDeletingNote} color="error" disabled={isSaving}>
          <DeleteOutline />
        </Button>
      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
