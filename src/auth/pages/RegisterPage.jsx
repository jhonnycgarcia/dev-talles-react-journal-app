import { Button, Grid2, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { Google } from "@mui/icons-material"

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear Cuenta">
      <form>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
            />
          </Grid2>

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

          <Grid2 container size={12} spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid2 size={{ xs: 12 }}>
              <Button variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid2>
          </Grid2>

          <Grid2 container size={12} spacing={2} direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tengo una cuenta</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              ingresar
            </Link>
          </Grid2>

        </Grid2>
      </form>
    </AuthLayout>
  )
}
