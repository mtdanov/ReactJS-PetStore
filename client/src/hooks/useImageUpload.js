import { useState, useEffect } from 'react';

export default function useImageUpload(initialImage) {
    const [image, setImage] = useState(initialImage);
    const [imageFile, setImageFile] = useState(null);
    useEffect(() => {
        setImage(initialImage);
    }, [initialImage]);

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    return {
        image,
        imageFile,
        onImageChange,
    };
}
