import { Button, Grid2, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { AuthLayout } from "../layout/AuthLayout"

import { checkingAuthentication, startGoogleSignIn } from "../../store"
import { useForm } from "../../hooks"
import { useMemo } from "react"

export const LoginPage = () => {

  const { email, password, onInputChange } = useForm({
    email: 'plars@yopmail.com',
    password: '123456',
  });
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit', { email, password });
    dispatch(checkingAuthentication(email, password));
  }

  const onGoogleSignIn = () => {
    console.log('google sign in');
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit }>
        <Grid2 container spacing={2}>
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
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                disabled={ isAuthenticating }
              >
                Login
              </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={ onGoogleSignIn }
                disabled={ isAuthenticating }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid2>
          </Grid2>

          <Grid2 container size={12} spacing={2} direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid2>

        </Grid2>
      </form>
    </AuthLayout>
  )
}
