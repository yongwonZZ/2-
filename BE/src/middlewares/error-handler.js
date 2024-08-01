function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);

  // 에러가 CustomError의 인스턴스인 경우 해당 상태 코드를 사용하고, 그렇지 않으면 500 코드를 사용합니다.
  //const status = error.status || 500;
  res.status(status).json({ result: 'error', reason: error.message });
}

export { errorHandler };
