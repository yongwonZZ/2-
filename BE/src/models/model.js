import mongoose from 'mongoose';

import UserSchema from './schemas/user-schema.js';

const User = mongoose.model('User', UserSchema);

export { User };
