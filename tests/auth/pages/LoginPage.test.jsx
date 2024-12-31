import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store";
import { MemoryRouter } from "react-router-dom";
import { demoUserRegister, notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock(
    '../../../src/store/auth/thunks', 
    () => ({
        startGoogleSignIn: () => mockStartGoogleSignIn,
        startLoginWithEmailAndPassword: (email, password) => {
            return () => mockStartLoginWithEmailAndPassword({email, password})
        }
    })
);

jest.mock(
    'react-redux',
    () => ({
        ...jest.requireActual('react-redux'),
        useDispatch: () => (fn) => fn(),
    })
)

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('debe de mostrar el componente correctamente ', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter
                    future={{v7_startTransition: true, v7_relativeSplatPath: true }}
                >
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('botón de google debe de llamar a "startGoogleSignIn"', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter
                    future={{v7_startTransition: true, v7_relativeSplatPath: true }}
                >
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
    });

    test('submit debe de llamar al "startLoginWithEmailAndPassword"', () => {
        const email = demoUserRegister.email;
        const password = demoUserRegister.password;

        render(
            <Provider store={ store }>
                <MemoryRouter
                    future={{v7_startTransition: true, v7_relativeSplatPath: true }}
                >
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emialField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emialField, { target: { value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { value: password } });

        const loginForm = screen.getByLabelText('login-form');
        fireEvent.submit( loginForm );

        expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
    });

});