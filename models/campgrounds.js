const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const CampG = new mongoose.Schema({
    name: {
        type: String,
    },
    images: [
        {   
            url: String,
            filename: String
        }
    ],
    price: {
        type: Number,
        min: 0
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews : [
        {
            type: Schema.Types.ObjectID,
            ref: 'Review'
        }
    ]
})

CampG.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
    console.log(doc)
})



const Campground = mongoose.model('Campground',CampG);

module.exports = Campground;