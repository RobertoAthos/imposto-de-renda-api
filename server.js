const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const UserRoute = require('./Routes/userRoute')

app.use(cors())
app.use('/user',express.json(), UserRoute)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log("Error in connecting to DataBase", err.message)
})

app.listen(process.env.PORT, ()=>console.log('Server running '))