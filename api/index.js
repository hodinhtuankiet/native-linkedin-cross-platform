const express = require('express')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const app = express()

const port = 8000;
const cors = require('cors')

app.use(cors());