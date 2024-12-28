import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestore } from "../../firebase";
import { addNewEmptyNote, setActiveNote, setSaving } from "./journalSlice";


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