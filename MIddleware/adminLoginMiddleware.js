const fs = require('fs')
var flagAdminLogin = false
var flagpenstatus = false
var flagappstatus = false
var penlist = []
var applist = []

var data = fs.readFileSync('data.json')
data = JSON.parse(data)
if (data.userdata.length == 0) {
    return res.json("your bank has not any customer")
}

exports.checkUsername = (req, res, next) => {
    const { username } = req.body;
    if (username == data.admindata[0].username) {
        next();
    }
    return res.json({ msg: "Invalid Username" })
}

exports.checkPassword = (req, res, next) => {
    const { password } = req.body;
    if (password == data.admindata[0].password) {
        flagAdminLogin = true;
        next()
    }
    return res.json({ msg: "Invalid Password" })
}

exports.approvestatus = (req, res, next) => {
    const { id } = req.body;
    let i = data.userdata.findIndex(element => element.id == id)
    if (i >= 0) {
        if (data.userdata[i].status == "approve") {
            return res.json("Id is already approved.")
        }
        data.userdata[i].status = "approve";
        data.userdata[i].Account = Math.floor(Math.random() * 1E17)
        data.userdata[i].password = Math.floor(Math.random() * 1E4)
        fs.writeFileSync('data.json', JSON.stringify(data))
        flagstatus = true;
        next();
    }
    return res.json("invalid id. Please check and try again")
}

exports.checkAdminFlag = (req, res, next) => {
    if (flagAdminLogin) {
        next();
    }
    return res.json("Please login firts.")
}

exports.checkPenStatus = (req, res, next) => {
    for (var i = 0; i < data.userdata.length; i++) {
        if (data.userdata[i].status == "pending") {
            flagpenstatus = true
            penlist.push(data.userdata[i])
        }
    }
    if (flagpenstatus) {
        return res.json({ userpendata: penlist })
    }
    return res.json("All accounts are approved")
}

exports.checkAppStatus = (req, res, next) => {
    for (let i in data.userdata) {
        if (data.userdata[i].status == "approve") {
            flagappstatus = true;
            applist.push(data.userdata[i])
        }
    }
    if (flagappstatus) {
        return res.json({ userappdata: applist })
    }
    return res.json("All account are pending")
}

exports.removeaccount = (req, res, next) => {
    const { id } = req.body
    let i = data.userdata.findIndex(element => element.id == id)
    if (i >= 0) {
        if (data.userdata[i].balance <= 0) {
            data.userdata.splice(i, 1)
            fs.writeFileSync('data.json', JSON.stringify(data))
            next();
        }
        return res.json("Account has " + data.userdata[i].balance + " RS. balance. You cant remove it. Please inform " + data.userdata[i].name + " him/her. Contact detail. Number :   " + data.userdata[i].number + "  email id:  " + data.userdata[i].email)
    }
    return res.json("Invalid id. Please check and try again")
}


exports.changeusernamepassword = (req, res, next) => {
    const { username, password } = req.body;
    data.admindata[0].username = username;
    data.userdata[0].password = password;
    fs.writeFileSync('data.json', JSON.stringify(data))
    return res.json("Username and password is successfully updated")
}
