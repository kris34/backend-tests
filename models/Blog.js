const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const blogSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: 'Image not valid!',
    },
  },
  content: { type: String, required: true },
  category: { type: String, required: true },
  followList: { type: [Types.ObjectId], ref: 'User', default: [] },
  owner: { type: Types.ObjectId, ref: 'User' },
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
