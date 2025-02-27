import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const verifyFirebaseToken = async (token) => {
    try {
        return await admin.auth().verifyIdToken(token);
    } catch (error) {
        console.error('Firebase token verification failed:', error);
        return null;
    }
};
