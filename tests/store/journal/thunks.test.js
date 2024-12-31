import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, setActiveNote, setSaving } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { uid as mockUid } from "../../fixtures/authFixtures";
import { FirebaseFirestore } from "../../../src/firebase";

const clearCollections = async () => {
    const collectionRef = collection(FirebaseFirestore, `${mockUid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach(doc => {
        deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);
}

describe('Pruebas en JournalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('debe de crear una nueva nota en blanco', async () => {
        getState.mockReturnValue({ auth: { uid: mockUid }});

        await startNewNote()(dispatch, getState);

        const note = {
            title: '',
            body: '',
            date: expect.any(Number),
            id: expect.any(String),
            imageUrls: []
        };

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(setSaving());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(note));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(note));

        // Borrar de firestore
        await clearCollections();
    });

});