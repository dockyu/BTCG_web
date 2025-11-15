import express from 'express';
import testRoute from './testRoute.js';

const router = express.Router();

// 子路由註冊在 router
router.use('/test', testRoute);           // /api/test

export default router;
