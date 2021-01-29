const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receipeSchema = new Schema({
	name: String,
	image: String,
	style: String, 
	ABV: Number,
	receipe: String,
	review: String
});

module.exports = mongoose.model('review', receipeSchema);