const Blog = require('../models/Blog');

async function createBlog(data) {
  return await Blog.create(data);
}

async function getAll() {
  return await Blog.find({}).lean();
}

async function getById(id) {
  return await Blog.findById(id).lean();
}

module.exports = {
  createBlog,
  getAll,
  getById
};
