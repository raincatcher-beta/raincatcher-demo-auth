'use strict';

var UserMemoryStore = require('fh-wfm-user/lib/user/store');
var data = require('./data.json');

/**
 * Mediator listener for the user module, manipulates 'wfm:user:*' mediator topics
 * @param  {Mediator} mediator a mediator instance to publish/subscribe to
 */
module.exports = function(mediator) {
  var store = new UserMemoryStore('user', data);
  store.listen('', mediator);
};
