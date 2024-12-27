import { Alert, Button, Grid2, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useMemo, useState } from "react"

import { AuthLayout } from "../layout/AuthLayout"

import { startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store"
import { useForm } from "../../hooks"

const initialForm  = {
  email: 'plars@yopmail.com',
  password: '123456',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe ser válido' ],
  password: [ (value) => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres' ],
};

export const LoginPage = () => {

  const { 
    email, password, onInputChange,
    isFormValid, emailValid, passwordValid,
  } = useForm(initialForm, formValidations);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) { return; }
    dispatch(startLoginWithEmailAndPassword(email, password));
  }

  const onGoogleSignIn = () => {
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
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }
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
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid2>

          <Grid2 container size={12} spacing={2} sx={{ mb: 2, mt: 1 }}>
            
            <Grid2 
              size={{ xs: 12 }}
              display={ errorMessage ? 'block' : 'none' }
            >
              <Alert severity="error">
                { errorMessage }
              </Alert>
            </Grid2>

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
