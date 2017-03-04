var BasicAuth = require('basic-auth');
var Validator = require('../security/validator');
var EmployeeManagementService = require('../services/employee-management-service');
var utilities = require('../models/utilities');

// Adding Employee feedback
exports.addFeedback = function (req, res) {
  "use strict";

  // Get the credentials
  var credentials = BasicAuth(req);  // TODO: Change this to JWT based stateless token based authentication
  var feedback = {};
  feedback.uuid = utilities.getUuid();
  feedback.timestamp= utilities.getTimestamp();
  feedback.thinkingtocommentfor = req.body.thinkingtocommentfor;
  feedback.relationship = req.body.relationship;
  feedback.name = req.body.name;
  feedback.emailid = req.body.emailid;
  feedback.subject = req.body.subject;
  feedback.comment = req.body.comment;

  Validator.isValidCredentials(req)
  .then(result =>{
    return EmployeeManagementService.addFeedback(credentials, feedback);
  })
  .then(savedFeedback => {
    console.info('in controller - added new feedback for the employee: ' + JSON.stringify(savedFeedback.uuid));
    return res.sendStatus(201);
  }).catch(err => {
    console.error('err while adding new feedback : ' + JSON.stringify(err)) + err.stack;
    return res.sendStatus(err.code).send(err);
  });
};

// Get all employee feedbacks
exports.getAllFeedbacks = (req, res) => {
  "use strict";

  EmployeeManagementService.getAllFeedbacks()
  .then(feedbacks => { return res.status('200').send(feedbacks); })
  .catch(err => { return res.status('500').send('error encountered while reading feedbacks from DB'); })
};