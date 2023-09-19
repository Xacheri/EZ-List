const bcrypt = require('bcrypt'); // bcrypt, for passwords
const LoginModel = require('../models/LoginModel.js'); // the model the controller uses

class LoginController {
    #repository; // the database connection (#private)
    #table; // the login table name (#private)
    logins; // an array of login rows

    // constructor for the class
    constructor() {
        this.#repository = require("../config/db.js"); // the connection to the database
        this.#table = process.env.TABLE_LOGIN; // the login table from dotenv
        this.logins = [];
    }

    // name: loginUser
    // purpose: given a username and password, update this user model if credentials are correct
    // params: username, a username in the database. password, the unhashed version of a hashed password in the database
    // returns: loggedin, boolean whether log in succeeded
    async loginUser(username, password) {
        try
        {
            var UserPackets = await this.findUserByUsername(username);
            var verifypassword = this.#verifyPassword;
            var validlogin = UserPackets.some(async (packet) => await verifypassword(password, packet.login_password));

            if (validlogin)
            {
                var validPacket = UserPackets.find(async (packet) => await verifypassword(password, packet.login_password));
                this.logins = [LoginModel.ConstructWithRowDP(validPacket)];
            }
            return validlogin;
        }
        catch (e)
        {

            console.log(e);
        }
    }

    // name: findUserByUsername
    // purpose: given a username, retrieves all rows from the login table matching
    // params: username, a string to match a username in the table
    // returns: this.logins, updates this.logins
    async findUserByUsername(username) {
        try
        {
            this.#repository.connect();
            let LoginPackets = await this.#repository.select(this.#table, "*", `login_username='${username}'`);
            this.logins = LoginPackets.map(packet => LoginModel.ConstructWithRowDP(packet));
            this.#repository.disconnect();
            return this.logins;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    // name: createUserLogin
    // purpose: given a username and password pair, create a login entry in the database
    // params: username, a string to become a username in the table; password, a string to be hashed into a password for the database
    // returns: boolean, true/false - if an error occurred
    async createUserLogin(username, password)
    {
        try {
            password = await this.#hashPassword(password);
            let logininfo = {
                login_password: password,
                login_username: username,
            }
            this.#repository.connect();
            await this.#repository.insert(this.#table, logininfo);
            this.#repository.disconnect();
            return true;
        }
        catch (e)
        {
            console.log(e);
            return false;
        }
    }

    // name: #hashPassword (#private)
    // purpose: Hashes a password w/ bcrypt
    // params: password, string to hash
    // returns: a promise to a hashed password
    #hashPassword(password){
        return new Promise((resolve, reject) =>
        {
            bcrypt.hash(password, 12, (err, hash) => {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    resolve(hash);
                }
            });
        });
    }

    // name: #verifyPassword (#private)
    // purpose: checks a password w/ bcrypt
    // params: input, string to check ; hash, hashed string to check against
    // returns: a promise to boolean whether password matched
    #verifyPassword(input, hashedTarget) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(input, hashedTarget, (err, result) => {
                if (err) {reject(err); }
                else {resolve(result); }
            })
        })
    }
}

module.exports = new LoginController();