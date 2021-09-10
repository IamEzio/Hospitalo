const express = require('express');
const router = express.Router();
const storage = require('../cloudinary');
const multer = require('multer');
const upload = multer(storage)

const Hospital = require('../models/hospital');
const catchAsync = require('../utils/catchAsync');
const { validateHospital, isLoggedIn, isAuthor } = require('../middleware');
const hospitals = require('../controllers/hospitals');

router.route('/')
    .get(catchAsync(hospitals.index))
    .post(isLoggedIn, upload.array('image'), validateHospital, catchAsync(hospitals.createHospital))

router.get('/search', catchAsync(hospitals.searchHospitals))
router.get('/new', isLoggedIn, hospitals.renderNewForm)

router.get('/about', hospitals.renderAboutForm)

router.route('/:id')
    .get(catchAsync(hospitals.showHospital))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateHospital, catchAsync(hospitals.editHospital))
    .delete(isAuthor, isLoggedIn, catchAsync(hospitals.deleteHospital));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(hospitals.renderEditForm))


module.exports = router;