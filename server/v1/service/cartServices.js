const db = require('../db'); // Import the database connection

const cartService = {
    async addItem(userId, productId, quantity) {
        const query = 'INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?';
        return new Promise((resolve, reject) => {
            db.query(query, [userId, productId, quantity, quantity], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    async editItem(userId, productId, quantity) {
        const query = 'UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [quantity, userId, productId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    async deleteItem(userId, productId) {
        const query = 'DELETE FROM cart WHERE userId = ? AND productId = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [userId, productId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = cartService;
