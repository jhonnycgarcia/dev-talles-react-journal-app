import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid2, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { setActiveNote, startSaveNote } from "../../store"

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

  const {
    body, title, imageUrls, date,
    onInputChange, isFormValid, formState
  } = useForm(note);

  const dateString = useMemo(() => {
    const dateObj = new Date(date);
    return dateObj.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch( setActiveNote(formState) );
  }, [formState]);

  useEffect(() => {
    if(messageSaved.length > 0) {
      Swal.fire(
        'Nota Actualizada',
        messageSaved,
        'success'
      );
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    console.log('Save note');
    dispatch( startSaveNote() );
  }
  

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
          <Button 
            color="primary" 
            sx={{ padding: 2 }}
            onClick={onSaveNote}
            disabled={ isSaving }
          >
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
