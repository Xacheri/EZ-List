/* 
    Filename: Index.js
    Purpose: Entry point and setup for the express.js application
*/

// import and configure dotenv
require('dotenv').config();

const express = require('express'); // create express app
const app = express();

const bodyParser = require("body-parser"); //  body-parser for parsing requests

const db = require('./config/db.js');

db.connect();

db.disconnect();