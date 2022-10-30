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

async function editBlog(id, blog) {
  const existing = await Blog.findById(id);

  existing.title = blog.title;
  existing.imageUrl = blog.imageUrl;
  existing.content = blog.content;
  existing.category = blog.category;

  await existing.save();
}

async function followBlog(blogId, userId) {
  const blog = await Blog.findById(blogId);

  if (blog.followList.includes(userId)) {
    throw new Error('" You already follow this blog!');
  }
  blog.followList.push(userId);
  await blog.save();
}

module.exports = {
  createBlog,
  getAll,
  getById,
  getByIdWithOwner,
  deleteById,
  editBlog,
};
