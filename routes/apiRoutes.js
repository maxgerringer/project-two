const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // Teacher App
  router.get('/roster', AppController.getStudents);
  router.get('/assignments', AppController.getAssignments);
  router.post('/assignments', AppController.createAssignment);
  router.get('/assignments/:id', AppController.getAssignmentById);
  router.put('/assignments/:id', AppController.updateAssignment);
  router.delete('/assignments/:id', AppController.deleteAssignment);
  router.get('/resources', AppController.getResources);
  router.post('/resources', AppController.createResource);
  router.get('/resources/:id', AppController.getResourceById);
  router.put('/resources/:id', AppController.updateResource);
  router.delete('/resources/:id', AppController.deleteResource);

  return router;
};
