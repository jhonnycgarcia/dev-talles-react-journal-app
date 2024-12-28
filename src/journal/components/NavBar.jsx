import { useDispatch } from "react-redux";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Button, Grid2, IconButton, Toolbar, Typography } from "@mui/material"

import { startLogout } from "../../store";

export const NavBar = ({ drawerWidth = 240 }) => {

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  }

  return (
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
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid2
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={'100%'}
        >
          <Typography variant="h6" noWrap component="div">JournalApp</Typography>
          <Button color="error" onClick={onLogout}>
            <LogoutOutlined />
          </Button>
        </Grid2>
      </Toolbar>
    </AppBar>
  )
}
