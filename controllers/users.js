const User = require('../models/user.js');

module.exports.renderSignUpPage = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let {email, username, password} = req.body;
        const newUser = new User({email, username});
        const registerdUser = await User.register(newUser, password);
        req.login(registerdUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash('success', "Sign up successful. Welcome to Wanderlust!");
            res.redirect('/listings');
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/signup')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login.ejs')
}

module.exports.login = async (req, res) => {
        req.flash('success', 'Logged in Successfully. Welcome back!');
        let redirectUrl = res.locals.redirectUrl || '/listings';
        res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully');
        res.redirect('/listings');
    })
}