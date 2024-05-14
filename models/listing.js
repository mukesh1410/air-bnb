const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg",
        set: (v) => v === " "
         ? "https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg" 
         : v,
    }, 
    price: Number,                                                                                                       
    location: String,
    country: String,
    reviews: [
       {
           type: Schema.Types.ObjectId,
       },
    ],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
