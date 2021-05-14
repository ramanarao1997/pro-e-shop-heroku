import express from 'express'

import { registerUser, authUser, getUserProfile, sendResetEmail, resetPassword } from '../controllers/userController.js'

import { verifyBearerToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(verifyBearerToken, getUserProfile)

router.post('/sendresetlink', sendResetEmail)
router.put('/resetpassword', resetPassword)

export default router