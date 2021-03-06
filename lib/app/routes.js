var bodyparser = require('body-parser');
var jsonParser = bodyparser.json();
var login = require('../controllers/login-controller');
var roles = require('../controllers/roles-controller');
var profiles = require('../controllers/profiles-controller');
var users = require('../controllers/users-controller');

module.exports = function(app) {
  "use strict";

  app.use(jsonParser);

  app.get('/roles', roles.getAllRoles);
  app.post('/roles', jsonParser, roles.addRole);

  app.get('/profiles', profiles.getAllProfiles);
  app.post('/profiles', jsonParser, profiles.addProfile);

  app.get('/users/:uuid', users.getUserByUuid);
  app.post('/users', jsonParser, users.addUser);

  app.get('/login', login.login);
};
