import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import MenuOutlined from '@mui/icons-material/MenuOutlined';

import { logoutFirebase } from '../../firebase/providers';

export const NavBar = ({ drawerWidth = 240 }) => (
  <AppBar
    position="fixed"
    sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` }
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        sx={{
          mr: 2,
          display: { sm: 'none' }
        }}
      >
        <MenuOutlined />
      </IconButton>

      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6" noWrap component="div">
          JournalApp
        </Typography>

        <IconButton color="error" onClick={logoutFirebase}>
          <LogoutOutlined />
        </IconButton>
      </Grid>
    </Toolbar>
  </AppBar>
);
