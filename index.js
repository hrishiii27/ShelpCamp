require('dotenv').config();


const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const override = require('method-override');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const ExpressError = require('./Utilities/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrat = require('passport-local');
const User = require('./models/user');
const Helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const userRoutes = require('./routes/user');
const DbUrl = process.env.DB_URL;
const dbUrl = "mongodb://127.0.0.1:27017/CampGrounds";
const MongoStore = require('connect-mongo');

mongoose.connect(DbUrl)
.then(() => {
    console.log('mongo open bitch!')
})
.catch((err) => {
    console.log("Oh shii error")
    console.log(err)
})

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(override('_method'));
app.use(mongoSanitize());
app.use(Helmet({contentSecurityPolicy: false}));

app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
    mongoUrl: DbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'secretsshouldnotbelikethis'
    }
});

const sessionConfig = {
    store,
    name: 'wow',
    secret: 'secretsshouldnotbelikethis',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);

// app.get('/fakeUser', async(req, res) => {
//     const user = new User({ email: 'fake@gmail.com', username: "FakeBoy"});
//     const newUser = await User.register(user, 'fakechick');
//     res.send(newUser);
// })

app.get('/', (req, res) => {
    res.render("home")
})

app.all('*', (req, res, next) => {
    next(new ExpressError(404,"Sorry, the page requested was not found"));
})

app.use((err, req, res, next) => {
    const { status } = err;
    if(!err.message) err.message = "Sorry, the page requested was not found?!?";
    res.status(status).render('error', { err }); 
})

app.listen(3004, () => {
    console.log("Listening on 3004");
})