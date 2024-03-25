const express = require('express')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const mongodb = require('./config/mongodb')
const app = express()

const port = 8000;
const cors = require('cors')

app.use(cors());
// Middleware này cho phép Express đọc dữ liệu được gửi từ client dưới dạng application/x-www-form-urlencoded. 
// extended là false, thì dữ liệu sẽ được phân tích dưới dạng đơn giản (không hỗ trợ nested object hoặc array)
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware này cho phép Express đọc dữ liệu được gửi dưới dạng JSON.
// Nó giúp ứng dụng xử lý dữ liệu JSON được gửi từ client
app.use(bodyParser.json());

app.listen(port, () =>{
    console.log('server is running on port');
} )