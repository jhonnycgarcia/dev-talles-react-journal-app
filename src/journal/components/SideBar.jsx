import PropTypes from 'prop-types';

import { Box, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { TurnedInNot } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector(state => state.auth);

  return (
    <Box
      component="nav"
      sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid2 container>
                    <ListItemText primary={text} />
                    <ListItemText secondary={'Nisi consequat qui consectetur Lorem.'} />
                  </Grid2>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}

SideBar.propTypes = {
  drawerWidth: PropTypes.number,
};
