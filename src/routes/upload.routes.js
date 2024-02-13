import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = new Router();

router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.resolve('uploads', filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

export default router;
