const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the storage location and filename for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the directory path
        const uploadDir = 'uploads/images';

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });  // recursive ensures nested directories are created
        }

        // Set the destination to the directory
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename by appending timestamp to the original file name
        cb(null, 'profileImage-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with storage options
const upload = multer({ storage: storage }).single('profileImage'); // Expect the file to be in 'profileImage' field

module.exports = upload;
