import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const getProjects = (req, res) => {
    db.query('SELECT * FROM cuplikan_project', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const addProject = (req, res) => {
    const { judul, deskripsi } = req.body;
    const id = uuidv4();
    const image = req.file ? `images/${req.file.filename}` : '';
    const id_admin = req.session.userId; // Dapatkan id_admin dari sesi

    if (!id_admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const query = 'INSERT INTO cuplikan_project (id, judul, deskripsi, image, id_admin) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [id, judul, deskripsi, image, id_admin], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Project added successfully' });
    });
};

const updateProject = (req, res) => {
    const { id, judul, deskripsi } = req.body;
    const image = req.file ? `images/${req.file.filename}` : req.body.image;
    const id_admin = req.session.userId; // Dapatkan id_admin dari sesi

    if (!id_admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const query = 'UPDATE cuplikan_project SET judul = ?, deskripsi = ?, image = ?, id_admin = ? WHERE id = ?';

    db.query(query, [judul, deskripsi, image, id_admin, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Project updated successfully' });
    });
};

const deleteProject = (req, res) => {
    const { id } = req.params;

    db.query('SELECT image FROM cuplikan_project WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const imagePath = results[0].image;
            if (imagePath) {
                fs.unlink(path.join(__dirname, '..', imagePath), (err) => {
                    if (err) throw err;
                });
            }
        }

        db.query('DELETE FROM cuplikan_project WHERE id = ?', [id], (err, results) => {
            if (err) throw err;
            res.json({ message: 'Project deleted successfully' });
        });
    });
};

export { getProjects, addProject, updateProject, deleteProject };
