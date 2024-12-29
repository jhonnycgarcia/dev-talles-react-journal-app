import { createSlice } from '@reduxjs/toolkit';

// const activeNoteExample = {
//     id: '123',
//     title: 'Un nuevo título',
//     body: 'Un nuevo cuerpo',
//     imageUrls: ['https://somehost.com/someimage.jpg'],
//     date: 1633621945,
// };

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            const { payload } = action;
            state.isSaving = false;  
            state.notes = state.notes.map((note) => {
                if(note.id === payload.id) { return payload;}
                return note;
            });

            state.messageSaved = `${payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [
                ...state.active.imageUrls,
                ...action.payload
            ];
            state.isSaving = false; 
        },
        clearNotesLogout: (state) => {
            state.isSaving = false; 
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            const { payload: id } = action;
            state.notes = state.notes.filter((note) => note.id !== id);
            state.active = null;
            state.isSaving = false; 
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;