require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Import the cors package

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
app.use(cors());
//Set up mongoose connection 
const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
const mongoDB = process.env.MONGODB_URI

main().catch((err) => console.log(err));
async function main(){
  await mongoose.connect(mongoDB);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for all routes

app.use('/', indexRouter);
app.use('/api',apiRouter);


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
