import multer from 'multer';

export default multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
      callback('File format not supported', false);
      return;
    }
    callback(null, true);
  },
});
