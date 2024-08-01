import mongoose, { Schema } from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default CategorySchema;
