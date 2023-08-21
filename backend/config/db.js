const mongoose = require('mongoose');
//const db = "mongodb://admin:password@localhost:27017"; // config.mongoURI;
const db = "mongodb://admin:password@mongodb"; // config.mongoURI;
const connectDB = async() => {
    try {
        await mongoose.connect(db)
           .then(()=>
               console.log('MongoDB Connected...'));
    } catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;