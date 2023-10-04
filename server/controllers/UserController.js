const UserModel = require('../models/UserModel.js'); // the model the controller uses

class UserController {
    #repository; // the database connection (#private)
    #table; // the user table name (#private)
    users; // an array of user rows

    // constructor for the class
    constructor() {
        this.#repository = require("../config/db.js"); // the connection to the database
        this.#table = process.env.TABLE_USER; // the user table from dotenv
        this.users = [];
    }

    // name: findUserByLoginID
    // purpose: given a login_id, populate the users array with the matching user from the user table
    // params: login_id, a number to match the login id (foreign key to login table) of a user
    // returnsL this.users, updates this.users
    async findUserByLoginID(login_id)
    {
        try
        {
            await this.#repository.connect();
            let UserPackets = await this.#repository.select(this.#table, "*", `login_id=${login_id}`, true);
            this.users = UserPackets.map(packet => {return UserModel.ConstructWithRowDP(packet)});
            await this.#repository.disconnect();
            return this.users;
        }
        catch(e)
        {
            console.log(e);
        }
    }

    // name: createUser
    // purpose: given a name and loginID, create a user entry in the database
    // params: name, a string to become a name in the table; loginID, a number that foreign keys to the login table
    // returns: boolean, true/false - if an error occurred
    async createUser(name, login_id)
    {
        try {
            let userinfo = {
                name: name,
                login_id: login_id,
            }
            await this.#repository.connect();
            await this.#repository.insert(this.#table, userinfo);
            await this.#repository.disconnect();
            return true;
        }
        catch (e)
        {
            console.log(e);
            return false;
        }
    }

}

module.exports = new UserController();