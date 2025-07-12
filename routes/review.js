const express = require('express');
const router = express.Router({mergeParams: true}); // to get id from parent url in app.js l21
const wrapAsync = require('../utils/wrapAsync.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js');

const reviewController = require('../controllers/reviews.js');

// POST
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router;