const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receipeSchema = new Schema({
	name: 
	{type: String,
	required: true},

	style: 
	{type: String,
	required: true},

	ABV: 
	{type: String,
	required: true},

	recipe: 
	{type: String,
	required: true},

	review: 
	{type: String,
	required: true}
});

module.exports = mongoose.model('Recipe', receipeSchema);