const blogController = require('express').Router();
const {
  getById,
  getByIdWithOwner,
  deleteById,
} = require('../services/blogService');

blogController.get('/:id/details', async (req, res) => {
  const blog = await getByIdWithOwner(req.params.id);

  if (res.locals.username) {
    if (blog.owner._id == req.user._id) {
      blog.isOwner = true;
      console.log('here');
    }
  }

  res.render('details', {
    title: 'Details',
    blog,
  });
});

blogController.get('/:id/delete', async (req, res) => {
  await deleteById(req.params.id);

  res.redirect('/catalog');
});

module.exports = blogController;
