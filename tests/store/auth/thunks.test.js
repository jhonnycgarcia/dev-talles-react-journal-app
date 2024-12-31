import { signInWithGoogle } from "../../../src/firebase";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSignIn } from "../../../src/store/auth";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de invocar el "checking" credentials', async () => {
        await checkingAuthentication()(dispatch);
        // expect(dispatch).toHaveBeenCalledWith({ type: 'auth/checkingCredentials', payload: undefined });
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn debe de llamar "checkingCredentials" y "login"', async() => {
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(demoUser));
    });

    test('startGoogleSignIn debe de llamar "checkingCredentials" y "logout"', async() => {
        const loginData = { ok: false, error: 'Some error' };
        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ error: loginData.error }));
    });

});