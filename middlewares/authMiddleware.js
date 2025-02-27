import { verifyFirebaseToken } from '../config/firebaseAdmin.js';

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decodedUser = await verifyFirebaseToken(token);
    if (!decodedUser) return res.status(403).json({ message: 'Invalid token' });

    req.user = decodedUser; // Attach user info to request
    next();
};
