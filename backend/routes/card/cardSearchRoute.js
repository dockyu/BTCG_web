/* 
 * "/card/cardSearch" 的路由
 */
import express from 'express';
import { main } from '#controllers/card/cardSearchController.js';

const router = express.Router();

router.post('/', main); /* cardSearchController.js : main() */

export default router;
