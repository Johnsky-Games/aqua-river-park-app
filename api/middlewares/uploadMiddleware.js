import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/avatars');
    },
    filename: (req, file, cb) => {
        const unique = randomBytes(10).toString('hex');
        const ext = extname(file.originalname);
        cb(null, `${unique}${ext}`);
    },
});

export default multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png'];
        const ext = extname(file.originalname).toLowerCase();
        cb(null, allowed.includes(ext));
    },
});
