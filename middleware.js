const ExpressError = require('./utils/ExpressError');
const { hospitalSchema, reviewSchema } = require('./schemas.js');
const Hospital = require('./models/hospital');
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {                   //methods provided by passport
        req.session.returnTo = req.originalUrl;        //so that user may return to same page after log in
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {   //checking if the user is the author of the hospital
    const { id } = req.params;
    const hospital = await Hospital.findById(id);
    if (!hospital.author.equals(req.user._id)) {
        req.flash('error', 'Yor do not have the required permissions!');
        return res.redirect(`/hospitals/${hospital._id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {     //checking if the user is the author of the review
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Yor do not have the required permissions!');
        return res.redirect(`/hospitals/${id}`);
    }
    next();
}

module.exports.validateHospital = (req, res, next) => {
    let hospital = req.body.hospital;
    let facilities = [];
    if (req.body.facilities) {
        facilities = Object.values(req.body.facilities);
    }
    hospital['facilities'] = facilities;
    const data = { hospital };
    const { error } = hospitalSchema.validate(data);    //validating by JOI Schema
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);    //validating by JOI Schema
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
