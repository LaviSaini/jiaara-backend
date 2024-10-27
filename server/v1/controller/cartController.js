const cartService = require('../services/cartService');

// Add item to cart
exports.addItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const results = await cartService.addItem(userId, productId, quantity);
        res.status(201).json({ message: 'Item added to cart', results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit item quantity in cart
exports.editItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const results = await cartService.editItem(userId, productId, quantity);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        res.json({ message: 'Item quantity updated', results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete item from cart
exports.deleteItem = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const results = await cartService.deleteItem(userId, productId);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        res.json({ message: 'Item removed from cart', results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
