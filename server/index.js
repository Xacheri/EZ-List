/* 
    Filename: Index.js
    Purpose: Entry point and setup for the express.js application
*/

// import and configure dotenv
require('dotenv').config();

const express = require('express'); // create express app
const app = express();

//const bodyParser = require("body-parser"); //  body-parser for parsing requests
const LoginRouter = require("./routes/LoginRoutes.js")
// var LoginController = require('./controllers/LoginController.js');

// var func = async () => { 
//     // test area
// }
// func();

app.use("/login", LoginRouter);

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});