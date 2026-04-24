require("dotenv").config();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const Listing = require("./Schema.js");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
// const arr = require("./data.js");
mongoose
    .connect(MONGO_URL)
    .then(async () => {
        console.log("connected to database");
        /* await Listing.deleteMany({});
        await Listing.insertMany(arr);
        let data = await Listing.find({});
        console.log(data); */
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.render("root");
});

app.get("/listings", async (req, res) => {
    let data = await Listing.find({});
    res.render("listings", { data });
});

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let obj = await Listing.findById(id);
    res.render("editList", { obj });
});

app.put("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, req.body, {
        new: true
    });
    res.redirect("/listings");
});

app.get("/listings/new", (req, res) => {
    res.render("newListing");
});
app.put("/listings/new", async(req, res) => {
    await Listing.create(req.body.listingData);
    res.redirect("/listings");
});
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let obj = await Listing.findById(id);
    res.render("renderList", { obj });
});
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`);
});
