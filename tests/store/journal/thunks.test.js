import { startNewNote } from "../../../src/store/journal/thunks";
import { uid as mockUid } from "../../fixtures/authFixtures";

describe('Pruebas en JournalThunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('debe de crear una nueva nota en blanco', async () => {
        getState.mockReturnValue({ auth: { uid: mockUid }})
        await startNewNote()(dispatch, getState);
    });

});