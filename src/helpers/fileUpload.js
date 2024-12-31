import { getEnvironments } from "./getEnvironments";

const { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET } = getEnvironments();

export const fileUpload = async (file) => {
    if(!file) { return null; }
    
    const cloudUrl = `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('upload_preset', VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('file', file);

    try {
        const resp = await fetch(
            cloudUrl, 
            { method: 'POST', body: formData }
        );

        if(!resp.ok) { throw new Error('Error uploading file'); }

        const cloudResp = await resp.json();
        return cloudResp.secure_url;

    } catch (err) {
        return null;
    }
}