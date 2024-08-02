import mongoose from 'mongoose';

import UserSchema from './schemas/user-schema.js';
import BoardSchema from './schemas/board-schema.js';
import CommentSchema from './schemas/comment-schema.js';
import LikeSchema from './schemas/like-schema.js';

const User = mongoose.model('User', UserSchema);
const Board = mongoose.model('Board', BoardSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Like = mongoose.model('Like', LikeSchema);

export { User, Board, Comment, Like };
