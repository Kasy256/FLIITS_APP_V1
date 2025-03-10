// import express from 'express';
// import Profile from '../models/Profile.js';
// import multer from 'multer';
// import fs from 'fs';

// const router = express.Router();

// // Ensure uploads directory exists
// const uploadDir = 'uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure Multer for Image Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed (jpg, jpeg, png)!'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// // Profile route - Upload multiple images
// router.post('/profile', upload.fields([
//   { name: 'profilePicture', maxCount: 1 },
//   { name: 'idPicture', maxCount: 1 },
//   { name: 'licensePicture', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const {
//       FullName, ProfileName, Email, Phone, DOB, Gender, Language,
//       CarType, Country, City, idtype, idnumber, license, licenseED, About
//     } = req.body;

//     // Validate required fields
//     if (!FullName || !ProfileName || !Email || !Phone || !DOB || !Gender || !Language ||
//         !CarType || !Country || !City || !idtype || !idnumber) {
//       return res.status(400).json({ error: 'Required fields are missing' });
//     }

//     // Handle uploaded images safely
//     const profilePicture = req.files?.profilePicture?.[0]?.path || null;
//     const idPicture = req.files?.idPicture?.[0]?.path || null;
//     const licensePicture = req.files?.licensePicture?.[0]?.path || null;

//     // Create and save profile
//     const newProfile = new Profile({
//       FullName, ProfileName, Email, Phone, DOB, Gender, Language,
//       CarType, Country, City, idtype, idnumber, license, licenseED, About,
//       profilePicture, idPicture, licensePicture
//     });

//     await newProfile.save();
//     return res.status(201).json({ message: 'Profile saved successfully!', profile: newProfile });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Error saving profile data.', details: err.message });
//   }
// });

// // Handle Multer errors
// router.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ error: `Multer error: ${err.message}` });
//   } else if (err) {
//     return res.status(400).json({ error: `Upload failed: ${err.message}` });
//   }
//   next();
// });

// export default router;
