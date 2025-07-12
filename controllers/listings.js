const Listing = require('../models/listings.js');

module.exports.index = async (req, res) => { // ?category=Beach
    const { category } = req.query;
    let allListings;
    if (category) {
        allListings = await Listing.find({ category });
    } else {
        allListings = await Listing.find({});
    }
    res.render('listings/index.ejs', { allListings, category });
}

module.exports.renderNew = (req, res) => {
    res.render('listings/new.ejs');
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('owner');
    if (!listing) {
        req.flash('error', 'The listing you are trying to find does not exist!');
        return res.redirect('/listings');
    }
    res.render('listings/show.ejs', {listing})
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const data = req.body.listing; 
    if (!data) {
        throw new ExpressError(400, "listing is required in request body");
    }
    // Normalize image
    if (!data.image || data.image.trim() === "") {
        data.image = {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        };
    } else if (typeof data.image === "string") {
        data.image = {
            filename: "listingimage",
            url: data.image
        };
    }
    const newListing = new Listing(data);
    newListing.owner = req.user._id; // to save owner details while creating a new listing
    newListing.image = {filename, url};
    await newListing.save();
    req.flash("success", "Added a New Listing!");
    res.redirect('/listings');
};

module.exports.renderEdit = async (req, res) => {
    let {id} = req.params
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'The listing you are trying to find does not exist!');
        res.redirect('/listings');
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250');
    res.render('listings/edit.ejs', {listing, originalImageUrl});
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {filename, url};
        await listing.save();
    }
    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing Deleted!");
    res.redirect('/listings')
}