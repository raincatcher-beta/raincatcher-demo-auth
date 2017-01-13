'use strict';
var express = require('express');

module.exports = function buildAdminRouter(mediator) {
  var router = express.Router();

  // TODO: Remove this endpoint when not needed
  if (process.env.NODE_ENV === 'development') {
    /**
     * Asks for data to be reset to the default list of users
     * This is intended only for demonstration/debugging purposes
     * and by default only runs on NODE_ENV === 'development'
     */
    require('./addResetEndpoint')(router, mediator);
  }

  return router;
};