const express = require('express')
const router = express.Router();

const { checkId, checkStatus, checkPassword, checkbalance, checkbalancefordeposite, checkUserLogin, viewProfile } = require('../MIddleware/userLoginMiddleware')
const { checkLogin, withdraw, deposite } = require('../Controller/userLoginController')

router.post('/', checkId, checkStatus, checkPassword, checkLogin)
router.put('/withdraw', checkbalance, withdraw)
router.put('/deposite', checkbalancefordeposite, deposite)
router.get('/', checkUserLogin, viewProfile)

module.exports = router