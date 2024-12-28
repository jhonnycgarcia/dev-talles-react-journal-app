import { StarOutline } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid2
        container
        className="animate__animated animate__fadeIn animate__faster"
        direction="column"
        spacing={ 0 }
        alignItems="center"
        justifyContent="center"
        sx={{ 
            minHeight: 'calc(100vh - 110px)',
            backgroundColor: 'primary.main',
            borderRadius: 3,
        }}
    >
        <Grid2 size="12">
            <StarOutline sx={{ fontSize: 100, color: 'white' }} />
        </Grid2>
        <Grid2 size="12">
            <Typography variant="h5" color="white">
                Selecciona o crea una nota
            </Typography>
        </Grid2>
    </Grid2>
  );
}
