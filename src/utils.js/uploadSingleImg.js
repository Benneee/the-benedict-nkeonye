import cloudinary from 'cloudinary';

const uploadSingleImage = async (file, currentImage) => {
  let imageUrl = currentImage;
  let imageProps;

  if (file) {
    const result = await cloudinary.v2.uploader.upload(file.path);
    imageUrl = result.secure_url;
    imageProps = result;
  }
  return { imageProps, imageUrl };
};

export default uploadSingleImage;
