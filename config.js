const config = {
    lineApi: {
        weblogin: "https://access.line.me/dialog/oauth/weblogin",
        accessToken: "https://api.line.me/v2/oauth/accessToken",
        userProfile: "https://api.line.me/v2/profile",
        state: "abc123",
        loginCallbackUrl: "http://localhost:3000/auth/line-login-callback"
    },
    sql: {
        host: "xxx.xxx.xxx.xxx",
        user: "user",
        password: "password",
        database: "database"
    }
}

module.exports = config;