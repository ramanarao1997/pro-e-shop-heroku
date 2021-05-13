import express from 'express'

import { registerUser, authUser, getUserProfile } from '../controllers/userController.js'

import { verifyBearerToken } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(verifyBearerToken, getUserProfile)

export default router