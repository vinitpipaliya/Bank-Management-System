const fs = require('fs')


var data = fs.readFileSync('data.json')
data = JSON.parse(data)

exports.checkadminlogin = (req, res) => {
    return res.json("Login Successfull.")
}

exports.checkapprove = (req, res) => {
    return res.json("Successfully Approved")
}

exports.viewuserdata = (req, res) => {
    return res.json({ userdata: data.userdata })
}

exports.showmsg = (req, res) => {
    return res.json("Successfully account deleted")
}