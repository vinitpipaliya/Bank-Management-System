const fs = require('fs')
const { list } = require('../MIddleware/userRegistrationMiddleware')
const userModel = require('../Model/userModel')


// import { list } from '../MIddleware/userRegistrationMiddleware';
// var data = fs.readFileSync('data.json')//~
// data = JSON.parse(data)//~
// if (JSON.parse(data).userdata.length == 0) {
//     var list = { counter: 1 }
// }
// else {
//     data = JSON.parse(data)
//     var lastElement = data.userdata.pop()
//     var list = { counter: lastElement.counter }
// }

exports.insertRecord = (req, res) => {
    // list.id = (list.counter)++
    // data.userdata.push(list)
    // fs.writeFileSync('data.json', JSON.stringify(data))
    // res.json({ msg: "Registation successfull" })

    const data = req.body
    const userdata = new userModel(data);
    userdata.save((err, bat) => {
        if (err) {
            res.status(400).json({
                err: "Not able to save in Db.  " + err
            })
        }
        return res.status(200).send({
            message: "Successfully inserted"
        });
    })
}

exports.viewRecord = (req, res) => {
    const data = req.body
    // const userdata = new userModel(data);
    // const collection = connect.collection("krishna");

    userModel.find({}, (err, bat) => {
        if (err) {
            res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        return res.status(200).send({
            Data: bat
        })
    })
}

exports.updateRecord = (req, res) => {
    const data = req.body;
    userModel.findByIdAndUpdate(data._id, data, (err, abc) => {
        if (err) {
            res.status(400).json({
                err: "Not able to find in database. " + err
            })
        }
        return res.status(200).send({
            Data: abc
        })
    })
}

exports.deleteRecord = (req, res) => {
    const data = req.body;
    userModel.findByIdAndRemove(data._id, (err, abc) => {
        if (err) {
            res.status(400).json({
                err: "Not Able tpo delete from Database. " + err
            })
        }
        return res.status(200).send({
            msg: "Your data is successfully deleted."
        })
    })
}