import { CircularProgress, Grid2 } from "@mui/material"

export const CheckingAuth = () => {
  return (
    <Grid2
    container
    direction="column"
    spacing={0}
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
  >
    <Grid2>
      <CircularProgress color="warning" />
    </Grid2>
  </Grid2>
  )
}
