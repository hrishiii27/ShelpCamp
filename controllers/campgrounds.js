const Campground = require('../models/campgrounds');
const { cloudinary } = require('../cloudinary/index');
const axios = require('axios');

module.exports.index = async (req, res) => {
    const camp = await Campground.find({});
    res.render('campgrounds/index',{ camp });
}

module.exports.renderNewForm = async (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const newCamp = new Campground(req.body.campground);
    newCamp.images = req.files.map(f => ({ url: f.path, filename: f.filename}));
    newCamp.author = req.user._id;
    await newCamp.save();
    console.log(newCamp);
    req.flash('success', 'New Campground created successfully');
    res.redirect(`/campgrounds/${newCamp._id}`);
}

module.exports.viewCampground = async (req, res) => {
    const { id } = req.params;
    const foundCamp = await Campground.findById(id).populate({path: 'reviews', populate: { path: 'author'}}).populate('author');
    if(!foundCamp){
        req.flash('error', 'Cannot find that Campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/details',{ foundCamp });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const foundCamp = await Campground.findById(id);
    if(!foundCamp){
        req.flash('error', 'Cannot find that Campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{ foundCamp });
}

module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const foundCamp = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, {new: true});
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename}));
    foundCamp.images.push(...imgs);
    await foundCamp.save();
    if(req.body.deleteImgs){
        for(let fname of req.body.deleteImgs){
            await cloudinary.uploader.destroy(fname);
        }
        await foundCamp.updateOne({$pull: { images: {filename: {$in: req.body.deleteImgs}}}});
    }
    req.flash('success', "Campground Updated successfully");
    res.redirect(`/campgrounds/${foundCamp._id}`);
}

module.exports.deleteCampground = async (req,res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', "Campground Deleted successfully");
    res.redirect('/campgrounds');
}