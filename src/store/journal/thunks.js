import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestore } from "../../firebase";
import { addNewEmptyNote, setActiveNote, setNotes, setSaving } from "./journalSlice";
import { loadNotes } from "../../helpers";


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