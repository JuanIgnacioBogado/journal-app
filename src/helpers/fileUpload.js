const { VITE_PRESET_NAME, VITE_CLOUD_NAME } = import.meta.env;

export const fileUpload = async file => {
  if (!file) throw new Error('No tenemos ningún archivo a subir');

  const cloudUrl = `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append('upload_preset', VITE_PRESET_NAME);
  formData.append('file', file);

  try {
    const res = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('No se pudo subir la imagen');

    const { secure_url } = await res.json();
    return secure_url;
  } catch (error) {
    console.log('error', error);
    throw new Error(error.message);
  }
};
