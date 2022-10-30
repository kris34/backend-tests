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

async function getByIdWithOwner(blogId) {
  return await Blog.findById(blogId).populate('owner').lean();
}

async function deleteById(id) {
  return await Blog.findByIdAndDelete(id);
}

module.exports = {
  createBlog,
  getAll,
  getById,
  getByIdWithOwner,
  deleteById
};
