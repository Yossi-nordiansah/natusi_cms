import { findByUsername } from '../models/User.js';

const login = (req, res) => {
    const { username, password } = req.body;

    findByUsername(username, (err, results) => {
        if (err) throw err;
        if (results.length > 0 && results[0].password === password) {
            res.json({ message: 'Login Successfully' });
        } else {
            res.json({ message: 'Invalid Username or Password' });
        }
    });
};

export { login };
