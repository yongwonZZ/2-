import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import apiRouter from './routers/index.js';
import { errorHandler } from './middlewares/custom-error.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connect Success!');
  })
  .catch((err) => console.log(err));

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: '*', // 출처 허용 옵션
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
  })
);

app.use(express.json()); // express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 라우터
app.use('/api', apiRouter);
app.get('/api', (req, res) => {
  res.send('API RUNNING...');
});

// 에러 핸들러
app.use(errorHandler);

export default app;
