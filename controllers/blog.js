const blogController = require('express').Router();
const {
  getById,
  getByIdWithOwner,
  deleteById,
  editBlog,
} = require('../services/blogService');
const { parseError } = require('../util/parser');

blogController.get('/:id/details', async (req, res) => {
  const blog = await getByIdWithOwner(req.params.id);

  if (res.locals.username) {
    if (blog.owner._id == req.user._id) {
      blog.isOwner = true;
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

blogController.get('/:id/edit', async (req, res) => {
  const blog = await getById(req.params.id);

  res.render('edit', {
    title: 'Edit Blog',
    blog,
  });
});

blogController.post('/:id/edit', async (req, res) => {
  const blog = await getById(req.params.id);

  const edited = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    category: req.body.category,
  };

  try {
    if (Object.values(edited).some((v) => !v)) {
      throw new Error('All fields are required!');
    }

    await editBlog(req.params.id, edited);

    res.redirect(`/blog/${req.params.id}/details`);
  } catch (err) {
    res.render('edit', {
      title: 'Edit Blog',
      body: Object.assign(edited, { _id: req.params.id }),
      errors: parseError(err),
    });
  }
});

module.exports = blogController;
