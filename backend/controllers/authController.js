import { findByUsername } from '../models/User.js';

const login = (req, res) => {
    const { username, password } = req.body;

    findByUsername(username, (err, results) => {
        if (err) throw err;
        if (results.length > 0 && results[0].password === password) {
            req.session.userId = results[0].id_admin; // Simpan id_admin di sesi
            res.json({ message: 'Login Successfully', id_admin: results[0].id_admin });
        } else {
            res.json({ message: 'Invalid Username or Password' });
        }
    });
};

export { login };
