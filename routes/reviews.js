const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../Utilities/wrapAsync');
const Campground = require('../models/campgrounds');
const Review = require('../models/review');
const { valiReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', valiReview, isLoggedIn, wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviews.deleteReview)

module.exports = router;