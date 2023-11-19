import express from 'express';
import handleGetAllMessages from '../controllers/message.js';
const router = express.Router();

router.get('/', handleGetAllMessages)

export default router;