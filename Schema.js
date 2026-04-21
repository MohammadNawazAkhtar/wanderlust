const mongoose = require("mongoose");
let listingSchema = new mongoose.Schema({
    title: String,
    desc: String,
    imageLink: String,
    price: Number,
    location: String,
    country: String
});
let Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing