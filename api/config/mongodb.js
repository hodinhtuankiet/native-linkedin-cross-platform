import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://tuankietdev:tuankietdev@cluster0.7wnyjhf.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

export default mongoose;
