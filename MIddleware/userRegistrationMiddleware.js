// const e = require('express')
const fs = require('fs')

var Regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var NumRegex = /^([+]\d{2})?\d{10}$/

var data = fs.readFileSync('data.json')
if (JSON.parse(data).userdata.length == 0) {
    data = JSON.parse(data)
    var list = { counter: 1, Account: '', password: '', status: 'pending', balance: 0, passbook: [{}] }
}
else {
    data = JSON.parse(data)
    var lastElement = [...data.userdata].pop()
    var list = { counter: lastElement.counter, Account: '', password: '', status: 'pending', balance: 0, passbook: [{}] }
}

exports.checkName = (req, res, next) => {
    const { name } = req.body
    if (name.length >= 3) {
        list.name = name
        next()
    }
    return res.json({ msg: "3 character karta motu nam nakho\nEnter greater than 3 character" })
}

exports.checkEmail = (req, res, next) => {
    const { email } = req.body
    if (email.match(Regex)) {
        next();
    }
    return res.json({ msg: "sarkhu email nakho\nPlease check your email" })
}

exports.checkNumber = (req, res, next) => {
    const { number } = req.body
    if (number.match(NumRegex) && number.length == 10) {
        next()
    }
    return res.json({ msg: "sacho number nakho\nPlease check your number" })
}

exports.checkEmailForReg = (req, res, next) => {
    const { email } = req.body
    // data = JSON.parse(data)
    if (data.userdata.length == 0) {
        list.email = email
        next()
    }
    else {
        const found = data.userdata.find(element => element.email == email)
        if (found) {
            return res.json({ msg: "aa email regidter che\nThis email is already register.Please enter another email" })
        }
        list.email = email
        next();
    }
}

exports.checkNumberForReg = (req, res, next) => {
    const { number } = req.body
    if (data.userdata.length == 0) {
        list.number = number
        next()
    }
    else {
        const found = data.userdata.find(element => element.number == number)
        // res.json(found)
        if (found) {
            return res.json({ msg: "aa number register che\nThis number is already register. Please enter another  number" })
        }
        list.number = number
        next()
    }
}
exports.list = list
// module.exports = { list }