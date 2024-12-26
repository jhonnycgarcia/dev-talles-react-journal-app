import { Grid2, TextField, Typography } from "@mui/material"

export const LoginPage = () => {
  return (
    <Grid2
      container
      direction="column"
      spacing={ 0 }
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid2 
        className="box-shadow"
        xs={ 3 }
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>Login</Typography>
        <form>
          <Grid2 container spacing={ 2 }>
            <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="email@example.com"
                fullWidth
              />
            </Grid2>

            <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password"
                placeholder="******"
                fullWidth
              />
            </Grid2>
            
          </Grid2>
        </form>

      </Grid2>

    </Grid2>
  )
}
