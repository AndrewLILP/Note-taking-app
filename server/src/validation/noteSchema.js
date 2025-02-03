const Joi = require('joi');

const noteSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.min': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Title is required'
    }),
  
  content: Joi.string()
    .required()
    .messages({
      'any.required': 'Content is required'
    }),
  
  tags: Joi.array()
    .items(Joi.string().trim())
    .default([])
    .messages({
      'array.base': 'Tags must be an array'
    })
});

module.exports = {
  noteSchema
};