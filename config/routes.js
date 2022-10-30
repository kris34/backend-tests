const authController = require('../controllers/auth');
const blogController = require('../controllers/blog');
const catalogController = require('../controllers/catalog');
const createController = require('../controllers/create');
const homeController = require('../controllers/home');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use('/create', hasUser(), createController);
  app.use('/catalog', catalogController);
  app.use('/blog', blogController);
};
