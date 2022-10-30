const { getAll } = require('../services/blogService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
  const blogs = await getAll();
  res.render('home', {
    title: 'Home page',
    blogs,
  });
});

module.exports = homeController;
