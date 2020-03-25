import cloudinary from 'cloudinary';

const uploadSingleImage = async (file) => {
  let imageUrl;

  if (file) {
    const result = await cloudinary.v2.uploader.upload(file.path);
    imageUrl = result.secure_url;
  }
  return imageUrl;
};

export default uploadSingleImage;
