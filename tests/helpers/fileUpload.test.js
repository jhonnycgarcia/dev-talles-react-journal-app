import { fileUpload } from "../../src/helpers/fileUpload";

describe('Pruebas en helper fileUpload', () => {
    
    test('debe de subir el archivo correctamente a cloudinary', async() => {
        const fileUrl = 'https://dummyimage.com/600x400/000/fff';
        const resp = await fetch(fileUrl);
        const blob = await resp.blob();

        const file = new File([blob], 'mock-image.png');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
    });

});