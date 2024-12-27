import { registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        // console.log('result', result);

        const { ok, error, ...rest } = result;
        // ! Si ocurre un error, se desconecta del usuario
        if(!ok){
            return dispatch(logout({ error }));
        } 

        // * Se autentica exitosamente
        dispatch(login(rest));
    }
}

export const startCreatingUserWithEmailAndPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, error } = await registerUserWithEmailAndPassword({email, password, displayName});

        // ! Si ocurre un error, se desconecta del usuario
        if(!ok){
            return dispatch(logout({error}));
        } 

        // * Se autentica exitosamente
        dispatch(login({email, displayName, photoURL, uid}));
    }
}