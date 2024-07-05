import express from 'express';
import multer from 'multer';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/projects', getProjects);
router.post('/projects', upload.single('image'), addProject);
router.put('/projects/:id', upload.single('image'), updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
