const express = require('express')
const bp = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

var app = express();
mongoose.connect(process.env.URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('DB CONNECT')
}).catch((err) => {
    console.log("ERROR IN CONNECT" + err)
});

app.use(bp.json())

const userRegistrartion = require('./Rounting/userRounting')
const userLogin = require('./Rounting/userLoginRouting')
const adminLogin = require('./Rounting/adminLoginRouting')

app.use('/Registration', userRegistrartion)
app.use('/UserLogin', userLogin)
app.use('/AdminLogin', adminLogin)
app.listen(process.env.PORT, () => {
    console.log("SERVER START")
})