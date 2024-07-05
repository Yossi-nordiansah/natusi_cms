import db from '../config/db.js';

const findByUsername = (username, callback) => {
    return db.query('SELECT * FROM admin WHERE username = ?', [username], callback);
};

export { findByUsername };