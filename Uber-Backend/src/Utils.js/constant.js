require("dotenv").config()
module.exports.COOKIES_OPTION = 
    { signed: true, expires: new Date(Date.now() + 3600000) }
