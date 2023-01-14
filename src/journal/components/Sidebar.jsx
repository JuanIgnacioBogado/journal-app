import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { SidebarItem } from './';

export const Sidebar = ({ drawerWidth = 240 }) => {
  const { notes, displayName } = useSelector(({ journal, auth }) => ({
    notes: journal.notes,
    displayName: auth.displayName
  }));

  return (
    <Box component="nav" width={{ sm: drawerWidth }} flexShrink={{ sm: 0 }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map(note => (
            <SidebarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
