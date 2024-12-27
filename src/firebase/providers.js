import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
            error: null,
        }

    } catch (err) {
        // Handle Errors here.
        const errorCode = err.code;
        console.log('errorCode', errorCode);
        const errorMessage = err.message;
        // auth/cancelled-popup-request
        console.log('error', err);
        return {
            ok: false,
            error: errorMessage,
        }
    }
};

export const registerUserWithEmailAndPassword = async({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        // await updateProfile(resp.user, { displayName });
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
            error: null,
        }
    } catch (err) {
        console.log('error', err);
        return {
            ok: false,
            error: err.message,
        }
    }
}