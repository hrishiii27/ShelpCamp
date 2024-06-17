const express = require('express');
const router = express.Router();
const wrapAsync = require('../Utilities/wrapAsync');
const { validate, isAuthor, isLoggedIn } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

const Campground = require('../models/campgrounds');

router.route('/')
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validate, wrapAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(wrapAsync(campgrounds.viewCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validate, wrapAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm))


module.exports = router;