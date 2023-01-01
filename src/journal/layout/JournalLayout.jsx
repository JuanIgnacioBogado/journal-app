import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { NavBar, Sidebar } from '../components';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box display="flex">
      <NavBar {...{ drawerWidth }} />

      <Sidebar {...{ drawerWidth }} />

      <Box component="main" flexGrow={1} p={3}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
