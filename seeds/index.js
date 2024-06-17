const mongoose = require('mongoose');
//const override = require('method-override');
const cities = require('./cities');
const { places , descriptors } = require('./seedHelp');
const Campground = require('../models/campgrounds');
const accessKey = process.env.UNSPLASH_KEY


mongoose.connect('mongodb://127.0.0.1:27017/CampGrounds')
.then(() => {
    console.log('mongo open bitch!')
})
.catch((err) => {
    console.log("Oh shii error")
    console.log(err)
})

async function loadRandomPhotos() {
    try {
        const randNum = Math.floor(Math.random() * 9) + 1;
        const data = await fetch(`https://api.unsplash.com/collections/483251/photos?page=${randNum}&client_id=${accessKey}`);
        const valuesJSON = await data.json();
        const randomPhoto = valuesJSON[randNum];
        return randomPhoto.urls.small;
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0;i < 50; i++){
        const random = Math.floor(Math.random() * 1000) + 1;
        const price = Math.floor(Math.random() * 99) + 1;
        const ImgUrl = await loadRandomPhotos();
        if(!ImgUrl) continue;
        const camp = new Campground({
            author: "666aff1ecc9b360bc3ff703b",
            location: `${cities[random].city},${cities[random].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            images: [
                {
                    url: ImgUrl,
                    filename: `ShelpCamp/${random}`
                }
            ],
            price: `${price}`

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})