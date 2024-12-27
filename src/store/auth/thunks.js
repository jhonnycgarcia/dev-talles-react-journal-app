import { signInWithGoogle } from "../../firebase";
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

        // ! Si ocurre un error, se desconecta del usuario
        if(!result.ok){
            dispatch(logout(result.error));
        } 

        // * Se autentica exitosamente
        const { ok, error, ...rest } = result;
        dispatch(login(rest));
    }
}