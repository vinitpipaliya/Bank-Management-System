const express = require('express')
const router = express.Router();

const { insertRecord, viewRecord, updateRecord, deleteRecord } = require('../Controller/userRegistrationController')
// const { checkName, checkEmail, checkEmailForReg, checkNumberForReg, checkNumber } = require('../MIddleware/userRegistrationMiddleware')

// router.post('/', checkName, checkEmail, checkEmailForReg, checkNumber, checkNumberForReg, insertRecord)
router.post('/', insertRecord)
router.get('/', viewRecord)
router.put('/', updateRecord)
router.delete('/', deleteRecord)

module.exports = router