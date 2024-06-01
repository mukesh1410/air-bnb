const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Reviews
//Post Review Route
router.post("/", isLoggedIn, validateReview,
 wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete("/:reviewid", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.distroyReview)
);

module.exports = router;