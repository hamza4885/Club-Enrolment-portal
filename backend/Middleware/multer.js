const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File name
  },
});

// Filter file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
  }
};

// Initialize multer with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 *1024*1024}, // Max file size 2MB
});

module.exports = upload;
