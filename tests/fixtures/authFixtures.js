
export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    providerId: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123',
    email: 'example@email.com',
    displayName: 'Example User',
    photoURL: 'https://dummyimage.com/200x200/000/fff',
    errorMessage: null,
    providerId: 'firebase',
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
    providerId: null,
}

export const demoUser = {
    uid: '123',
    email: 'example@email.com',
    displayName: 'Example User',
    photoURL: 'https://dummyimage.com/200x200/000/fff',
    providerId: 'firebase',
}