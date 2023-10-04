const express = require('express');
const router = express.Router();
const AuthenticationController = require("../controllers/AuthenticationController.js");

router.get("/", async (req, res) => {
    let username = req.query.username;
    let password = req.query.password;
    let response = await AuthenticationController.authenticateWithLogin(username, password);
    res.status(response.statusCode).send(response);
});

module.exports = router;