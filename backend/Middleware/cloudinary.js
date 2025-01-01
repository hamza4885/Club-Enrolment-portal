const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to handle file uploads (any type of file)
const uploadFileToCloudinary =
  (fieldName, folder, multiple = false, required) =>
  async (req, res, next) => {
    try {
      // Check if file is uploaded
      if (!req.files || !req.files[fieldName]) {
        if (required) {
          return res
            .status(400)
            .json({ message: `No file uploaded in field: ${fieldName}` });
        }
        return next();
      }

      const files = req.files[fieldName];
      const uploadedFiles = [];
      console.log('Files coming in:', req.files);
console.log('FieldName in files:', req.files[fieldName]);


   

      if (multiple && Array.isArray(files)) {
        // Handle multiple files
        for (const file of files) {
      
          
          const uploadResult = await cloudinary.uploader.upload(
            file.tempFilePath, // Use tempFilePath from express-fileupload
            {
              folder: folder,
              resource_type: "auto", // Automatically determine file type
            }
          );

          fs.unlinkSync(file.tempFilePath); // Cleanup temp file
          uploadedFiles.push({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            name: file?.name,
          });
        }
      } else {
        // Handle single file
    

        const file = files;
        const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: folder,
          resource_type: "auto", // Automatically determine file type
        });


        fs.unlinkSync(file.tempFilePath); // Cleanup temp file
        uploadedFiles.push({
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          name: file?.name,
        });
      }

      // Attach uploaded files to request object
      req.filesUploaded = uploadedFiles;
  

      next();
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      res.status(500).json({ message: "Error uploading file", error: error.message });
    }
  };

module.exports = { uploadFileToCloudinary };
