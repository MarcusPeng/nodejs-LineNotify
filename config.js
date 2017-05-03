const config = {
    lineApi: {
        weblogin: "https://access.line.me/dialog/oauth/weblogin",
        accessToken: "https://api.line.me/v2/oauth/accessToken",
        userProfile: "https://api.line.me/v2/profile",
        notifyAuthorize: "https://notify-bot.line.me/oauth/authorize",
        notifyToken: "https://notify-bot.line.me/oauth/token",
        notify: "https://notify-api.line.me/api/notify",
        state: "marcus822",
        loginCallbackUrl: "http://localhost:3000/auth/line-login-callback",
        notifyCallbackUrl: "http://localhost:3000/auth/line-notify-callback",
    },
    sql: {
        host: "xxx.xxx.xxx.xxx",
        user: "user",
        password: "password",
        database: "database"
    }
}

module.exports = config;