/* 
 * "/card/describeSearch" 的路由
 */
import express from 'express';
import { main } from '#controllers/card/describeSearchController.js';

const router = express.Router();

router.post('/', main); /* describeSearchController.js : main() */

export default router;
