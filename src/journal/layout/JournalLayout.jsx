import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from '../components';
import PropTypes from 'prop-types';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <NavBar drawerWidth={ drawerWidth } />
        <SideBar drawerWidth={ drawerWidth } />
        <Box 
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />
            { children }
        </Box>
    </Box>
  )
}

JournalLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
