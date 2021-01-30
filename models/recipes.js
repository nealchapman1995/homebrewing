const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receipeSchema = new Schema({
	name: String,
	style: String, 
	ABV: Number,
	recipe: String,
	review: String
});

module.exports = mongoose.model('Recipe', receipeSchema);