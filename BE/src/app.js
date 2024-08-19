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
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      // HTTP와 HTTPS에서 오는 요청을 모두 허용
      if (origin.startsWith('http://') || origin.startsWith('https://')) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json()); // express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 라우터
app.use('/api', apiRouter);
app.get('/api', (req, res) => {
  res.send('API RUNNING...');
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../../FE/build/static')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../FE/build', 'index.html'));
});

// 에러 핸들러
app.use(errorHandler);

export default app;
