if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listings.js');

const url = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(url);
}

main()
.then(() => console.log('connected to db'))
.catch((err) => console.log(err))

const initDB = async () => {
    initData.data = initData.data.map((obj) => ({...obj, owner: '686bcd38d3244df55fd850b2'}))
    await Listing.insertMany(initData.data);
    console.log('data was initialized');
}

initDB();