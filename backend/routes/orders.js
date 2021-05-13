import express from 'express'
const router = express.Router()
import {
    addOrderItems,
} from '../controllers/orderController.js'

import { verifyBearerToken } from '../middleware/authMiddleware.js'

router.route('/').post(verifyBearerToken, addOrderItems)

export default router