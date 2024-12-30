
export const fileUpload = async (file) => {
    // if(!file) { throw new Error('File is required'); }
    if(!file) { return null; }
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/jhonnycgarcia/image/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'dev-talles-react-journal-app');
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