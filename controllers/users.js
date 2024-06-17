const User = require('../models/user');

module.exports.renderRegForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async(req, res) => {
    try{
        const { username, email, password } = req.body;
        const user = new User({username, email});
        const regUser = await User.register(user, password);
        req.login(regUser, function(err) {
            if(err) return next(err);
            req.flash('success', "Welcome to ShelpCamp!");
            res.redirect('/campgrounds');
        })
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}


module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', "Welcome Back!!!");
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}


module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}