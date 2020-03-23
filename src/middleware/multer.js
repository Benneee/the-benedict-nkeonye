import multer from 'multer';

// Define the storage medium
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../uploads');
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString, '-', file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/jpeg|jpg|png|gif$i/)) {
    callback(null, true);
  } else {
    callback(
      {
        message: 'File format not supported',
      },
      false,
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
