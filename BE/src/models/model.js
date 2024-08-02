import mongoose from 'mongoose';

import UserSchema from './schemas/user-schema.js';
import BoardSchema from './schemas/board-schema.js';
import CommentSchema from './schemas/comment-schema.js';
import LikeSchema from './schemas/like-schema.js';

// import CategorySchema from './schemas/category-schema.js';

const User = mongoose.model('User', UserSchema);
const Board = mongoose.model('Board', BoardSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Like = mongoose.model('Like', LikeSchema);

// Category 변수를 정의하지 않고, mongoose.model 호출도 주석 처리합니다.
// const Category = mongoose.model('Category', CategorySchema);

export { User, Board, Comment, Like /*, Category*/ };
