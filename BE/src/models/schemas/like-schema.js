import mongoose, { Schema } from 'mongoose';

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',
    required: true,
  },
});

export default LikeSchema;
