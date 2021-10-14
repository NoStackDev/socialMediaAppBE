const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

const connectDb = require('./db/db')

const userRoute = require('./routes/userRoute')


dotenv.config()

// PORT
const PORT = process.env.PORT || '8000'

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('common'))
app.use(helmet())

// routes
app.use('/api', userRoute)

app.listen(PORT, () => {
    connectDb()
    console.log(`backend server is up and running on port ${PORT}`)
})




