import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { Authenticate_APIs } from './route/authenticate/index.js';
import nodemailer from 'nodemailer';
// import mongodb from './config/mongodb';
import jwt from 'jsonwebtoken'; 
// import { corsOptions } from './config/cors.js';
const app = express();
const port = 3000;
import cors from 'cors';

// app.use(cors(corsOptions))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use mongoose.connect() to connect to MongoDB
mongoose.connect('mongodb+srv://tuankietdev:tuankietdev@cluster0.7wnyjhf.mongodb.net/linkedin')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

app.use('/', Authenticate_APIs);

app.listen(port, () => {
    console.log('server is running on port');
});
