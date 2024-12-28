import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseFirestore } from "../firebase";
import { parseDocs } from "./Firestore";


export const loadNotes = async (uid = '') => {
    if(!uid) throw new Error('uid is required');
    const collectionRef = collection(FirebaseFirestore, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const notes = parseDocs(docs);
    return notes;
}