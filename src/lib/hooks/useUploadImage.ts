import { useState } from 'react';

export function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(
    localStorage.getItem('imageUrl') || ''
  );

  const uploadImage = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ticket');
    formData.append('resource_type', 'auto');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/drl0zzfsj/upload',
        {
          method: 'POST',
          body: formData
        }
      );
      const data = await response.json();
      if (data.url) {
        setImageURL(data.url);
        localStorage.setItem('imageUrl', data.url);
        return data.url;
      } else {
        alert('Upload error: ' + data.error.message);
        setImageURL('');
        localStorage.setItem('imageUrl', '');
        return '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload error: Invalid image type');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { imageURL, uploadImage, loading };
}
