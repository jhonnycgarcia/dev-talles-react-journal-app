import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../../src/firebase";
import { checkingAuthentication, checkingCredentials, login, logout, startCreatingUserWithEmailAndPassword, startGoogleSignIn, startLoginWithEmailAndPassword, startLogout } from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser, demoUserRegister } from "../../fixtures/authFixtures";

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

    test('startCreatingUserWithEmailAndPassword debe de llamar "checkingCredentials" y "login"', async() => {
        const loginData = { ok: true, ...demoUser };
        const formData = { 
            email: demoUserRegister.email, 
            password: demoUserRegister.password, 
            displayName: demoUserRegister.displayName
        };
        await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailAndPassword(formData)(dispatch);

        expect(registerUserWithEmailAndPassword).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(demoUser));
    });

    test('startCreatingUserWithEmailAndPassword debe de llamar "checkingCredentials" y "logout"', async() => {
        const loginData = { ok: false, error: 'Some error' };
        const formData = { 
            email: demoUserRegister.email, 
            password: demoUserRegister.password, 
            displayName: demoUserRegister.displayName
        };
        await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailAndPassword(formData)(dispatch);

        expect(registerUserWithEmailAndPassword).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ error: loginData.error }));
    });

    test('startLoginWithEmailAndPassword debe de llamar "checkingCredentials" y "login"', async() => {
        const formData = { email: demoUserRegister.email, password: demoUserRegister.password };
        const loginData = { ok: true, ...demoUser };
        await loginWithEmailAndPassword.mockResolvedValue(loginData);

        await startLoginWithEmailAndPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(demoUser));
    });
    
    test('startLoginWithEmailAndPassword debe de llamar "checkingCredentials" y "logout"', async() => {
        const formData = { email: demoUserRegister.email, password: demoUserRegister.password };
        const loginData = { ok: false, error: 'Some error' };
        await loginWithEmailAndPassword.mockResolvedValue(loginData);

        await startLoginWithEmailAndPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ error: loginData.error }));
    });

    test('startLogout debe de llamar "logoutFirebase", "clearNotesLogout" y "logout"', async() => {
        const resp = { ok: true, error: null };
        await logoutFirebase.mockResolvedValue(resp);

        await startLogout()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({ error: resp.error }));
    });

});