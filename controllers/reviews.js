const Campground = require('../models/campgrounds');
const Review = require('../models/review');

module.exports.createReview = async (req,res) => {
    const camp = await Campground.findById(req.params.id);
    const rev = new Review(req.body.review);
    rev.author = req.user._id; 
    camp.reviews.push(rev);
    await rev.save();
    await camp.save();
    req.flash('success', "Campground Review added successfully");
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.deleteReview = async (req,res,next) => {
    const { id, reviewId } = req.params;
    Campground.findByIdAndUpdate(id, {$pull: {$reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', "Campground Review Deleted successfully");
    res.redirect(`/campgrounds/${id}`);
}