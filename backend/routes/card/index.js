/* 
 * "/card" 的路由
 */

import express from 'express';
import cardSearchRoute from './cardSearchRoute.js';
import describeSearchRoute from './describeSearchRoute.js';

const router = express.Router();

// 子路由註冊在 router
router.use('/cardSearch', cardSearchRoute); /* "/card/cardSearch" */
router.use('/describeSearch', describeSearchRoute); /* "/card/describeSearch" */

export default router;
