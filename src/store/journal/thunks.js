import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestore } from "../../firebase";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        console.log('startNewNote');
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


        // dispatch
        // dispatch(newNote)
        // dispatch(activeNote)
    }
}