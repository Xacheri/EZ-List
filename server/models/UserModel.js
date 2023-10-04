class UserModel {
    user_id; // the primary key of the user row
    user_name; // the name of the user
    user_note; // a note about the user
    login_id; // foreign key to the login associated with the user

    // constructor for the class
    constructor() {
        this.user_id = null;
        this.user_name = null;
        this.user_note = null;
        this.login_id = null;
    }

    // name : ConstructWithRowDP
    // purpose : uses a RowDataPacket (mysql) to populate fields
    // params : RowDataPacket, a mysql RowDataPacket from the user table
    // returns : A reference to the object that called it (with the updated values!)
    ConstructWithRowDP(RowDataPacket)
    {
        try
        {
            this.user_id = RowDataPacket.user_id;
            this.user_name = RowDataPacket.user_name;
            this.user_note = RowDataPacket.user_note;
            this.login_id = RowDataPacket.login_id;
            return this; // a reference to the self that was just modified
        }
        catch(e)
        {
            console.log(e);
        }
    }
}

module.exports = new UserModel();