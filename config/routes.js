const authController = require('../controllers/auth');
const catalogController = require('../controllers/catalog');
const createController = require('../controllers/create');
const homeController = require('../controllers/home');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use("/create", createController)
  app.use("/catalog", catalogController)
};
