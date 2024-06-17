const Joi = require('joi');
module.exports.CSchema = Joi.object({
    campground: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        //image: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
    }).required(),
    deleteImgs: Joi.array()
}); 

module.exports.revSch = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})