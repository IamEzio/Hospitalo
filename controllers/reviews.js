const Hospital = require('../models/hospital');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const hospital = await Hospital.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user;  //making the currentUser as review author
    hospital.reviews.push(review);
    await review.save();
    await hospital.save();
    res.redirect(`/hospitals/${hospital._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Hospital.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    res.redirect(`/hospitals/${id}`);
};
