const blogController = require('express').Router();
const { getById } = require('../services/blogService');

blogController.get('/:id/details', async (req, res) => {
  const blog = await getById(req.params.id);

  if (blog.owner == req.body._id) {
    blog.isOwner = true;
  }

  res.render('details', {
    title: 'Details',
    blog,
  });
});

module.exports = blogController;
