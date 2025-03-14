const db = require('../config/db');

const User = {
    create: (username, email, password, role, callback) => {
        db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role || 'user'], callback);
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },
    findById: (id, callback) => {
        db.query('SELECT id, username, email, role FROM users WHERE id = ?', [id], callback);
    }
};

module.exports = User;
