import mongoose, { Schema } from 'mongoose';

const BoardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  // img: {
  //이미지는 s3에 저장
  //   type: String,
  //   required: true,
  // },
  like: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default BoardSchema;
