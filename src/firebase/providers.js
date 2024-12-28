import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { providerId , user } = result;
        // console.log({user});
        const { displayName, email, photoURL, uid } = user;

        return { 
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
            providerId,
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
        const { uid, photoURL, providerId } = resp.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
            providerId,
            error: null,
        }
    } catch (err) {
        const errorCode = err.code;
        console.log('errorCode', errorCode);

        console.log('error', err);
        return {
            ok: false,
            error: err.message,
        }
    }
}

export const loginWithEmailAndPassword = async(email, password) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log('resp', resp);
        const { displayName, photoURL, uid } = resp.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
            providerId: 'emailAndPassword',
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

export const logoutFirebase = async() => {
    try {
        await FirebaseAuth.signOut();
        return {
            ok: true,
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