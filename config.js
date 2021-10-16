const dotenv = require('dotenv')


dotenv.config()

module.exports =  {
    PORT : process.env.PORT || '8000',
    DBURI : process.env.DBURI || "mongodb://127.0.0.1:27017/socialMediaApp"
}
