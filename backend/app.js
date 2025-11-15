import express from 'express';
import cors from 'cors';
import path from 'path';

import { SERVER_PORT, CARD_IMAGE_DIR } from './config.js';

import apiRouter from '#routes/api/index.js';
import cardRouter from '#routes/card/index.js';

import initServer from './lifecycle/initServer.js';

const app = express();

// 允許所有來源的 CORS
app.use(cors());

// 解析 JSON
app.use(express.json());

// 開放靜態圖片目錄
app.use('/cards', express.static(path.resolve(CARD_IMAGE_DIR)));

// 註冊路由
app.use('/api', apiRouter ); /* 綁定 /api 路由到 routes/api/index.js */
app.use('/card', cardRouter);

// 啟動生命週期
await initServer();

app.listen(SERVER_PORT, () => {
  console.log(`[SERVER] Running on port ${SERVER_PORT}`);
});
