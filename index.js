const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const port = 5000

const bodyParser = require('body-parser')

// All Route
const routes = require('./routes/index')
const login = require('./routes/login')
const event = require('./routes/event')
const register = require('./routes/register')
const sendsms = require('./routes/sms')


app.use(cors()) //Open To all
require('dotenv').config();
mongoose.set('strictQuery', false);

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => { console.log('conected to Data base') })
    .catch((err) => console.log(err))
app.use(bodyParser.json())

// Use all Route
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/event', event);
app.use('/api', routes);
app.use('/api/sendsms', sendsms);

app.use((err, req, res, next) => {
    console.log(err);
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.listen(port, () => {
    console.log('server conected on port: ' + port);
})