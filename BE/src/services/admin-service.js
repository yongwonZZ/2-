import { userService } from "./user-service.js";
import { validateUserSchema } from '../middlewares/validate-userschema.js';
import { errorHandler } from '../middlewares/error-handler.js';
import { adminRouter } from "../routers/admin-router.js";
import { userModel } from "../db/models/user-model.js";
import { body } from 'express-validator';
import { checkAdmin } from '../middlewares/check-admin.js';
import { loginRequired } from '../middlewares/login-required.js';

//모든 유저 정보 가져오기
async function getAllUsers(req, res, next) {
    try {
        //모든 유저 정보 가져오기
        const users = await userModel.findAll();

        //유저 정보가 없는 경우 에러
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: '유저 정보가 없습니다.',
            });
        }

        //프론트에 유저 정보 보내기
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}