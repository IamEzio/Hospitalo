const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const HospitalSchema = new Schema({
    title: String,
    location: String,
    images: [ImageSchema],
    description: String,
    facilities: [String],
    otime: String,
    ctime: String,
    url: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
}, opts)

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

HospitalSchema.virtual('properties.popUpMarkup').get(function () {
    return `${this._id}`;
});
HospitalSchema.virtual('properties.popUpMarkup2').get(function () {
    return `${this.title}`;
});


HospitalSchema.post('findOneAndDelete', async (deletedHospital) => {
    if (deletedHospital) {
        await Review.deleteMany({ _id: { $in: deletedHospital.reviews } });
    }
})
module.exports = mongoose.model('Hospital', HospitalSchema);