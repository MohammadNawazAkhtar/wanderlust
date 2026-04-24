const mongoose = require("mongoose");
let listingSchema = new mongoose.Schema({
    title: String,
    desc: String,
    imageLink: {
      type: String,
      default: "defaultlink.com"
    },
    price: Number,
    location: String,
    country: String
});
let Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing