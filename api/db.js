const mongoose = require('mongoose');

const uri = process.env.MONGODB_URL;

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
	console.log("Connected to MongoDB");
});

mongoose.connection.on('error', err => {
	console.log("MongoDB connection error:", err);
});

module.exports = mongoose;