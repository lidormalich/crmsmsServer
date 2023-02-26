const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const port = 5000
const routes = require('./routes/index')
const bodyParser = require('body-parser')





require('dotenv').config();

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => { console.log('conected to Data base') })
    .catch((err) => console.log(err))
app.use(bodyParser.json())

// Cros
app.use(cors()) //Open To all
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', routes)

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