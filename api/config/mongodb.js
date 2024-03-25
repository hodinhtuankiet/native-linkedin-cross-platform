const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tuankietdev:tuankietdev@cluster0.7wnyjhf.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

module.exports = mongoose;
