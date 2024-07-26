import cors from 'cors';
import express from 'express';
import { userRouter } from './routers/index.js'; // 디렉토리 대신 파일 경로를 명시적으로 지정
import { viewsRouter } from './routers/index.js';
import { errorHandler } from './db/middlewares/index.js';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 현재 모듈의 디렉토리 경로를 가져오는 함수
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// CORS 에러 방지
app.use(cors());

// morgan dev 사용
app.use(morgan('dev'));

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/main');
});

// Routes
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/main', 'main.html')); // 브랜치 병합 이후 여러분들 폴더를 public폴더로 옮겨야함
});

// User Page 관련
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Sign', 'signup.html'));
});
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/Sign', 'signin.html'));
});
app.get('/mypage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/myPage', 'myPage.html'));
});

// back
app.get('/api', (req, res) => {
  res.send('API RUNNING...');
});

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
app.use('/api/users', userRouter);
// 주석 처리된 경로들 확인 후 필요시 주석 해제
// app.use('/api/orders', orderRouter);
// app.use('/api/products', productRouter);
// app.use('/api/categories', categoryRouter);

// 순서 중요 (errorHandler는 다른 일반 라우팅보다 나중에 있어야 함)
app.use(errorHandler);

export { app };
