const bcrypt = require('bcrypt'); // bcrypt, for passwords

class LoginModel {
    #repository; // the database connection (#private)
    #table; // the login table name (#private)
    login_id; // unique login id, primary key for login table
    login_username; // username
    login_password; // password, hashed

    // constructor for the class
    constructor() {
        this.#repository = require("../config/db.js"); // the connection to the database
        this.#table = process.env.TABLE_LOGIN; // the login table from dotenv
        this.login_id = null;
        this.login_username = null;
        this.login_password = null;
    }

    // name: findUserByUsername
    // purpose: given a username, retrieves all rows from the login table matching
    // params: username, a string to match a username in the table
    // returns: users, a Promise of an array of RowDataPackets
    async findUserByUsername(username) {
        try
        {
            this.#repository.connect();
            var users = await this.#repository.select(this.#table, "*", `login_username='${username}'`);
            this.#repository.disconnect();
            return users;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    // name: loginUser
    // purpose: given a username and password, update this user model if credentials are correct
    // params: username, a username in the database. password, the unhashed version of a hashed password in the database
    // returns: loggedin, boolean true if log in succeeded
    async loginUser(username, password) {
        try
        {
            var usersByUsername = await this.findUserByUsername(username);
            for(let i = 0; i < usersByUsername.length; i++) 
            {
                let user = usersByUsername[i];
                if (await this.#verifyPassword(password, user.login_password))
                {
                    this.login_id = user.login_id;
                    this.login_password = user.login_password;
                    this.login_username = user.login_username;
                    return true;
                }
            }
            return false;
        }
        catch (e)
        {
            console.log(e);
        }
    }

    // name: findUserByUsername
    // purpose: given a username, retrieves all rows from the login table matching
    // params: username, a string to match a username in the table
    // returns: users, a Promise of OkPacket
    async createUserLogin(username, password)
    {
        try {
            password = await this.#hashPassword(password);
            this.login_password = password;
            this.login_username = username;

            this.#repository.connect();
            var response = await this.#repository.insert(this.#table, this.keyPairs());
            console.log(response);
            this.#repository.disconnect();
        }
        catch (e)
        {
            console.log(e);
        }
    }

    keyPairs()
    {
        return {
            login_id: this.login_id,
            login_username: this.login_username,
            login_password: this.login_password
        }
    }

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

    #verifyPassword(input, hashedTarget) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(input, hashedTarget, (err, result) => {
                if (err) {reject(err); }
                else {resolve(result); }
            })
        })
    }
}

module.exports = new LoginModel();