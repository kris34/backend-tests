const Blog = require('../models/Blog');

async function createBlog(data) {
  return await Blog.create(data);
}

async function getAll() {
  return await Blog.find({}).lean();
}

module.exports = {
  createBlog,
  getAll
};
