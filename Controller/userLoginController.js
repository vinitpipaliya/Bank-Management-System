const fs = require('fs')

var data = fs.readFileSync('data.json')
data = JSON.parse(data)

const { i } = require('../MIddleware/userLoginMiddleware')

exports.checkLogin = (req, res) => {
    res.json({ msg: "Login Successfull", acc: data.userdata[i] })
}

exports.withdraw = (req, res) => {
    return res.json("Withdraw successfully")
}

exports.deposite = (req, res) => {
    return res.json("Deposite successfully")
}