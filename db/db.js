const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config()

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DBURI)
        if (connection) { console.log('connected to database') }
    } catch (err) { console.error(err) }
}


module.exports = connectDb

