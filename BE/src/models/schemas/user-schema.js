import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // 관리자랑 구별 짓기 위함
      required: false,
      default: 'user',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export default UserSchema;
