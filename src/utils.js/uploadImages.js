import cloudinary from 'cloudinary';

const uploadImages = async (files) => {
  const result = {};

  try {
    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
          file.path,
          { use_filename: true, unique_filename: false },
          (error, res) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                url: res.url,
                id: res.public_id,
              });
            }
          },
        );
      });
    });
    result.images = await Promise.all(imagePromises);
  } catch (error) {
    result.errors = error;
  }
  return result;
};

export default uploadImages;
