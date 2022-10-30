const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, 'Title should be at least 5 charakters long!'],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: 'Image not valid!',
    },
  },
  content: {
    type: String,
    required: true,
    minlength: [10, 'Blog content should be at least 10 charakters long!'],
    maxlength: [50, 'Blog content cannot be longer then 50 charakters'],
  },
  category: {
    type: String,
    required: true,
    minlength: [3, 'Blog category should be at least 3 charakters long'],
  },
  followList: { type: [Types.ObjectId], ref: 'User', default: [] },
  owner: { type: Types.ObjectId, ref: 'User' },
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
