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
        },
        setNotes: (state, action) => {
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        updateNote: (state, action) => {
        },
        deleteNoteById: (state, action) => {
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    deleteNoteById,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions;