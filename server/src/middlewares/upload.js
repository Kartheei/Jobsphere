import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage });


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const userDir = path.join(__dirname, '../uploads', 'resumes', req.user._id.toString());
//     fs.mkdir(userDir, { recursive: true }, (error) => {
//       if (error) {
//         console.log('Error creating directory', error);
//         cb(error);
//       } else {
//         cb(null, userDir);
//       }
//     });
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/pdf' ||
//     file.mimetype === 'application/msword' ||
//     file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type, only PDF and DOC files are allowed!'), false);
//   }
// };

// export const upload = multer({ storage: storage, fileFilter: fileFilter });
