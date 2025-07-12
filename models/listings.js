const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
        "Trending",
        "Rooms",
        "Iconic cities",
        "Mountains",
        "Beach",
        "Castles",
        "Swimming Pools",
        "Camping",
        "Farmhouses",
        "Snowfields"
        ],
        required: true
    },
    description: String,
    image: {
        type: {
            filename: { type: String, default: "listingimage" },
            url: {
                type: String,
                default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            }
        },
        default: () => ({
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        }),
        set: (v) => {
            if (typeof v === 'string' && v.trim() === "") {
                return {
                    filename: "listingimage",
                    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                };
            }
            if (typeof v === 'string') {
                return {
                    filename: "listingimage",
                    url: v
                };
            }
            return v;
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing.reviews.length) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;