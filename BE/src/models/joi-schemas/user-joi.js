import Joi from 'joi';

// 회원가입 요청 스키마
export const RegisterJoi = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

// 사용자 정보 업데이트 요청 스키마
export const UpdateUserJoi = Joi.object({
  password: Joi.string(),
});

// 로그인 요청 스키마
export const LoginJoi = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
});

// 비밀번호 재설정 이메일 요청 스키마
export const ForgotPasswordJoi = Joi.object({
  email: Joi.string().email().required(),
});

// 비밀번호 재설정 요청 스키마
export const ResetPasswordJoi = Joi.object({
  newPassword: Joi.string().required(),
});
