import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestore } from "../../firebase";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        };

        const newDocRef = doc(
            collection(FirebaseFirestore, `${uid}/journal/notes`)
        );

        await setDoc(newDocRef, newNote);

        newNote.id = newDocRef.id;

        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('uid is required');
        const notes = await loadNotes(uid);
        dispatch( setNotes(notes) );
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseFirestore, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge: true});
        dispatch( updateNote(note) );
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const imageUrls = await Promise.all(fileUploadPromises);

        dispatch( setPhotosToActiveNote(imageUrls) );
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseFirestore, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch( deleteNoteById(note.id) );
    }
}