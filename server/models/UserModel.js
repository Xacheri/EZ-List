class UserModel {
    #repository; // the database connection (#private)
    #table; // the login table name (#private)
    user_id; // the primary key of the user row
    user_name; // the name of the user
    user_note; // a note about the user
    login_id; // foreign key to the login associated with the user

    // constructor for the class
    constructor() {
        this.#repository = require("../config/db.js"); // the connection to the database
        this.#table = process.env.TABLE_USER; // the user table from dotenv
        this.user_id = null;
        this.user_name = null;
        this.user_note = null;
        this.login_id = null;
    }



}

module.exports = new UserModel();