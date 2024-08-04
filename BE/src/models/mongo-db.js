import mongoose from 'mongoose';

const Connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('MongoDB connect Success!');
    })
    .catch((err) => console.log(err));
};
export default Connect;
