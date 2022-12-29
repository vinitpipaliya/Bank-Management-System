const express = require('express')
const router = express.Router();

const { checkUsername, checkPassword, approvestatus, checkAdminFlag, checkPenStatus, checkAppStatus, removeaccount, changeusernamepassword } = require('../MIddleware/adminLoginMiddleware')
const { checkadminlogin, checkapprove, viewuserdata, showmsg } = require('../Controller/adminLoginController')

router.post('/', checkUsername, checkPassword, checkadminlogin)
router.put('/', checkAdminFlag, approvestatus, checkapprove)
router.put('/changeidpass', checkAdminFlag, changeusernamepassword)
router.get('/', checkAdminFlag, viewuserdata)
router.get('/pending', checkAdminFlag, checkPenStatus)
router.get('/approve', checkAdminFlag, checkAppStatus)
router.delete('/', checkAdminFlag, removeaccount, showmsg)

module.exports = router