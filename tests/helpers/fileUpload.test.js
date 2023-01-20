import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

const { VITE_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, VITE_API_SECRET } = import.meta.env;

cloudinary.config({
  cloud_name: VITE_CLOUD_NAME,
  api_key: VITE_CLOUDINARY_API_KEY,
  api_secret: VITE_API_SECRET,
  secure: true
});

describe('fileUpload', () => {
  test('should to upload the file correctly to Cloudinary', async () => {
    const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    const file = new File([blob], 'image');
    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image'
    });
  });

  test('should to return null', async () => {
    const file = new File([], 'image.jpg');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
