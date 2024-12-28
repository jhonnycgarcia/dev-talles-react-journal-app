import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { useSelector } from "react-redux"
import { useMemo } from "react"

export const NoteView = () => {
  const { active: note } = useSelector(state => state.journal);

  const {
    body, title, imageUrls, date,
    onInputChange, isFormValid
  } = useForm(note);

  const dateString = useMemo(() => {
    const dateObj = new Date(date);
    return dateObj.toUTCString();
  }, [date]);

  return (
    <>
      <Grid2
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
        size="12"
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid2>
          <Typography fontSize={39} fontWeight="light">
            { dateString }
          </Typography>
        </Grid2>
        <Grid2>
          <Button color="primary" sx={{ padding: 2 }}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container size="12">
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid2>

      <ImageGallery />
    </>
  )
}
