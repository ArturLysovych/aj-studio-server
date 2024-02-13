import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname;
        const ext = path.extname(originalFileName);
        const baseName = path.basename(originalFileName, ext);
        const uniqueFileName = baseName + '.webp';
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage: storage });

export default upload;
