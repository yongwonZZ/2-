import mongoose, { Schema } from 'mongoose';

const CommentSchema = new mongoose.Schema({
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default CommentSchema;
