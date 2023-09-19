class LoginModel {
    login_id; // unique login id, primary key for login table
    login_username; // username
    login_password; // password, hashed

    // constructor for the class
    constructor() {
        this.login_id = null;
        this.login_username = null;
        this.login_password = null;
    }

    // name : ConstructWithRowDP
    // purpose : uses a RowDataPacket (mysql) to populate fields
    // params : RowDataPacket, a mysql RowDataPacket from the login table
    // returns : A reference to the object that called it (with the updated values!)
    ConstructWithRowDP(RowDataPacket)
    {
        try
        {
            this.login_id = RowDataPacket.login_id;
            this.login_username = RowDataPacket.login_username;
            this.login_password = RowDataPacket.login_password;
            return this; // a reference to the self that was just modified
        }
        catch(e)
        {
            console.log(e);
        }
    }
}

module.exports = new LoginModel();