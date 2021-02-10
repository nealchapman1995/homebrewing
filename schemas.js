const Joi = require("joi");

module.exports.receipeSchema = Joi.object({
	recipe: Joi.object({
		name: Joi.string().alphnum().required(),
		style: Joi.string().alphnum().required(),
		ABV: Joi.number().min(0).required(),
		recipe: Joi.string().alphnum().required(),
		review: Joi.string().alphnum()
	}).required()
})