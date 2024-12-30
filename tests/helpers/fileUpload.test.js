require('dotenv').config();
const cloudinary = require('cloudinary').v2;
import { fileUpload } from "../../src/helpers/fileUpload";

const {
    VITE_CLOUDINARY_CLOUD_NAME,
    VITE_CLOUDINARY_API_KEY,
    VITE_CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.config({ 
    cloud_name: VITE_CLOUDINARY_CLOUD_NAME, 
    api_key: VITE_CLOUDINARY_API_KEY,
    api_secret: VITE_CLOUDINARY_API_SECRET,
    secure: true,
});

describe('Pruebas en helper fileUpload', () => {
    
    test('debe de subir el archivo correctamente a cloudinary', async () => {
        const fileUrl = 'https://dummyimage.com/600x400/000/fff';
        const resp = await fetch(fileUrl);
        const blob = await resp.blob();

        const file = new File([blob], 'mock-image.png');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        await cloudinary.api.delete_resources([`journal/${imageId}`]);
    });

    test('debe de retornar null', async () => {
        const file = new File([], 'mock-image.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });

});