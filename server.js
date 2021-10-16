const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const config = require('./config')
const connectDb = require('./db/db')

const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')


const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('common'))
app.use(helmet())

// routes
app.use('/api', userRoute)
app.use('/api', postRoute)

app.listen(config.PORT, () => {
    connectDb()
    console.log(`backend server is up and running on port ${config.PORT}`)
})




