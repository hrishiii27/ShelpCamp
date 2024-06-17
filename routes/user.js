const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../Utilities/wrapAsync');
const passport = require('passport');
const localStrat = require('passport-local');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegForm)
    .post(wrapAsync(users.registerUser))

router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (users.loginUser))

router.get('/logout', users.logoutUser);

module.exports = router;