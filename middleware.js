const Campground = require('./models/campgrounds');
const Review = require('./models/review');
const { CSchema, revSch } = require('./schemas');
const ExpressError = require('./Utilities/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to perform this operation');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validate = (req, res, next) => {
    const { error } = CSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const Camp = await Campground.findById(id);
    if(!Camp.author.equals(req.user.id)){
        req.flash('error', 'You do not have permission to edit this campground');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const { reviewId, id } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user.id)){
        req.flash('error', 'You do not have permission to post a review');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.valiReview = (req, res, next) => {
    const { error } = revSch.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400,msg);
    }
    else{
        next();
    }
}