import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credentials});
        const user = result.user;
        // console.log({user});
        const { displayName, email, photoURL, uid } = user;

        return { 
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        }

    } catch (err) {
        // Handle Errors here.
        const errorCode = err.code;
        const errorMessage = err.message;
        // auth/cancelled-popup-request
        console.log('error', err);
        return {
            ok: false,
            error: errorMessage,
        }
    }
}; 