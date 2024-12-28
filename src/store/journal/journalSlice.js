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
        isSaving: true,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        addNewEmptyNote: (state, action) => {
        },
        setActiveNote: (state, action) => {
        },
        setNotes: (state, action) => {
        },
        setSaving: (state) => {
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
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
} = journalSlice.actions;