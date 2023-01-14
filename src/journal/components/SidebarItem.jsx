import { memo } from 'react';

import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import TurnedInNot from '@mui/icons-material/TurnedInNot';

import { useDispatchJournal } from '../../store/journal';

export const SidebarItem = memo(({ note }) => {
  const { setActiveNote } = useDispatchJournal();
  return (
    <ListItem>
      <ListItemButton onClick={() => setActiveNote(note)}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container overflow="hidden">
          <ListItemText
            disableTypography
            primary={note.title}
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
});
