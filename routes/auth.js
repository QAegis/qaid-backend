import express from 'express';
import User from '../models/User.js'; // User model
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Google/Firebase Login
router.post('/google-login', async (req, res) => {
    const { email, name, firebaseUid } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
        user = new User({ name, email, firebaseUid });
        await user.save();
    }

    res.json({ message: 'Login successful', user });
});

// Protected profile route
router.get('/profile', authenticate, async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
});

export default router;
