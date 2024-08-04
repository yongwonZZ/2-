import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import apiRouter from './routers/index.js';
// import indexRouter from './routes/indexRouter.js';
import { errorHandler } from './middlewares/custom-error.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDB connect Success!');
  })
  .catch((err) => console.log(err));

const app = express();
app.use(
  cors({
    origin: '*', // 출처 허용 옵션
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
  })
);
app.use(express.json()); // express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.static('views'));

// app.use("/images", express.static("images"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//라우터
app.use('/api', apiRouter);
app.get('/api', (req, res) => {
  res.send('API RUNNING...');
});

// app.use('/', indexRouter);

//에러 핸들러
app.use(errorHandler);
// app.use((err, req, res, next) => {
//   res.locals.message = err.message; // res.locals는 응답 객체의 로컬 변수(local variable)를 나타내며, 응답을 렌더링하는 뷰(view)에서 사용
//   res.locals.error = req.app.get('env') === 'development' ? err : {}; // 재사용하기 어려움

// render the error page
//   res.status(err.status || 500);
//   res.json({ message: err.message });
// });

export default app;
