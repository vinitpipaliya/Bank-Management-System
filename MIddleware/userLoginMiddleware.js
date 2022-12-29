const fs = require('fs')
const mongoose = require('mongoose')

var data = fs.readFileSync('data.json')
data = JSON.parse(data)
var list2 = {}
var flaguserlogin = false

exports.checkId = (req, res, next) => {
    const { id } = req.body
    let found = data.userdata.find(element => element.id == id)
    if (found) {
        next();
    }
    else {
        return res.josn({ msg: "Please check your id.ID joi ne nakho." })
    }
}

exports.checkStatus = (req, res, next) => {
    const { id } = req.body
    let i = data.userdata.findIndex(element => element.id == id)
    exports.i = i;
    if (data.userdata[i].status == "pending") {
        return res.json({ msg: "your account is not confirmed" })
    }
    else {
        next();
    }
}

exports.checkPassword = (req, res, next) => {
    const { password, id } = req.body;
    let i = data.userdata.findIndex(element => element.id == id)
    if (data.userdata[i].password == password) {
        flaguserlogin = true
        next();
    }
    return res.json({ msg: "incorrect password" })
}

exports.checkbalance = (req, res, next) => {
    const { withdraw, id } = req.body;
    let i = data.userdata.findIndex(element => element.id == id)
    if (flaguserlogin) {
        if (withdraw > 0) {
            if (data.userdata[i].balance > withdraw) {
                list2.transfer = "debit";
                list2.old_balance = data.userdata[i].balance;
                data.userdata[i].balance = data.userdata[i].balance - withdraw;
                list2.withdraw = withdraw;
                list2.current_balance = data.userdata[i].balance
                list2.way = "self";
                data.userdata[i].passbook.push(list2)
                fs.writeFileSync('data.json', JSON.stringify(data))
                next();
            }
            return res.json("You have not enough balance")
        }
        return res.josn("Enter valid amount")
    }
    return res.json("Please login first")
}

exports.checkbalancefordeposite = (req, res, next) => {
    const { deposite, id } = req.body;
    let i = data.userdata.findIndex(element => element.id == id)
    if (flaguserlogin) {
        if (deposite > 0) {
            list2.transfer = "credit";
            list2.old_balance = data.userdata[i].balance;
            data.userdata[i].balance = data.userdata[i].balance + deposite;
            list2.deposite = deposite;
            list2.current_balance = data.userdata[i].balance
            list2.way = "self";
            data.userdata[i].id.push(list2)
            fs.writeFileSync('data.json', JSON.stringify(data))
            next();
        }
        return res.json("Enter valid amount")
    }
    return res.json("Please login first")
}

exports.checkUserLogin = (req, res, next) => {
    res.json({ msg: flaguserlogin })
    if (flaguserlogin) {
        next();
    }
    return res.json("Please login first")
}

exports.viewProfile = (req, res, next) => {
    for (let i in data.userdata) {
        if (data.userdata[i] == id) {
            return res.json({ Profile: data.userdata[i] })
        }
    }
}