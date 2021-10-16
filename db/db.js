const mongoose = require('mongoose')

const config = require('../config')


const connectDb = async () => {
    try {
        const connection = await mongoose.connect(config.DBURI)
        if (connection) { console.log('connected to database') }
    } catch (err) { console.error(err) }
}


module.exports = connectDb

