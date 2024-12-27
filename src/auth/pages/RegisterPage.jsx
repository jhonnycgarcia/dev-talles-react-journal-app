import { Button, Grid2, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"

const formData = {
  displayName: 'Pedro Lars',
  email: 'plars@yopmail.com',
  password: '123456',
};

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe ser válido' ],
  password: [ (value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres' ],
  displayName: [ (value) => value.length >= 3, 'El nombre debe tener al menos 3 caracteres' ],
};

export const RegisterPage = () => {
  const { 
    displayName, email, password, onInputChange,
    displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit', { displayName, email, password });
  }

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={ onSubmit }>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="email@example.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="******"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid2>

          <Grid2 container size={12} spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid2 size={{ xs: 12 }}>
              <Button type="submit" variant="contained" fullWidth>
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
