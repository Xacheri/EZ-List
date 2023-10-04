class AuthenticationResponseModel {
    authenticated;
    user_id;
    login_id;
    username;

    statusCode;
    statusMessage;
    
    constructor(authenticated, user_id, login_id, username, statusCode, statusMessage) {
        this.authenticated = authenticated;
        this.user_id = user_id;
        this.login_id = login_id;
        this.username = username;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}

module.exports = AuthenticationResponseModel;