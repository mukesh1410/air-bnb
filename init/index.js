const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
}); 

async function main() {
    const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({ ...obj, owner: "664e1dfc595fc04391b83c77"}));
   console.log(initData.data);
   await Listing.insertMany(initData.data);
   console.log("data was initialize");
};

initDB();  