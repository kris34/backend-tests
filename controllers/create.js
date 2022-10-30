const Blog = require('../models/Blog');
const { createBlog } = require('../services/blogService');
const { parseError } = require('../util/parser');

const createController = require('express').Router();

createController.get('/', (req, res) => {
  res.render('create', {
    title: 'Create',
  });
});

createController.post('/', async (req, res) => {
  const blog = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    category: req.body.category,
    owner: req.user._id,
  };

  try {
    await createBlog(blog);

    if (Object.values(blog).some((v) => !v)) {
      throw new Error('All fields are required!');
    }

    res.redirect('/catalog');
  } catch (error) {
    res.render('create', {
      title: 'Create',
      blog: req.body,
      errors: parseError(error),
    });
  }
});






module.exports = createController;
