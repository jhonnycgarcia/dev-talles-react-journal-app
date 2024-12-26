import PropTypes from 'prop-types';
import { Grid2, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid2
            container
            direction="column"
            spacing={0}
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid2
                className="box-shadow"
                xs={3}
                sx={{ 
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2,
                    width: { sm: 450 }
                }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>

                { children }
            </Grid2>
        </Grid2>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};