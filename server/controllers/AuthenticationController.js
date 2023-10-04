const AuthenticationResponseModel = require('../models/AuthenticationResponseModel.js');

class AuthenticationController {
    UserController; // User Controller for managing User table functions
    LoginController; // Login Controller for managing Login table functions

    // constructor for the class
    constructor()
    {
        this.UserController = require('./UserController.js'); 
        this.LoginController = require('./LoginController.js');
    }

    // name : authenticateWithLogin
    // purpose : using a username and password,
    //           return an AuthenticationResponse containing the userdata and status
    async authenticateWithLogin(username, password){
        return new Promise((resolve) => {
            this.LoginController.loginUser(username, password).then(async (valid) => {
                if (valid)
                {
                    await this.UserController.findUserByLoginID(this.LoginController.logins[0].login_id);
                    resolve(new AuthenticationResponseModel(valid, this.UserController.users[0].user_id, this.LoginController.logins[0].login_id, this.UserController.users[0].user_name, 200, "Success"));
                }
                else {
                    resolve(new AuthenticationResponseModel(false, null, null, null, 500, "Bad Request"));
                }
            });
        })
    }
}

module.exports = new AuthenticationController();