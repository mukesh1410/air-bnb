const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


//Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}));

//New Route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs"); 
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {
        path: "author",
    },
}).populate("owner");
    if(!listing) {
        req.flash("error","Listing you requested for does not exists");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
})  
);

//Create Route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        // console.log(req.user);
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "New Listing Created");
        res.redirect("/listings");   
  })
);

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for does not exists");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    // if(!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    let { id } = req.params;
    // let Listing = await Listing.findById(id);
    // if(!listing.owner.equals(res.locals.currUser._id)) {
    //     req.flash("error", "You dont have permission to edit");
    //     return res.redirect(`/listings/${id}`);
    // }
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated");
    res.redirect("/listings");
}));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted");
        res.redirect("/listings");
    } catch (error) {
        console.error("Error deleting:", error);
        res.status(500).send("Error deleting");
    }
}));

module.exports = router;