'use strict';

var _ = require('lodash');

var users = require('./data.json');

module.exports = function(mediator) {
  var topicList = 'user:list:load';
  console.log('Subscribing to mediator topic:', topicList);
  mediator.subscribe(topicList, function() {
    setTimeout(function() {
      mediator.publish('done:' + topicList, users);
    }, 0);
  });

  var topicLoad = 'user:load';
  console.log('Subscribing to mediator topic:', topicLoad);
  mediator.subscribe(topicLoad, function(id) {
    setTimeout(function() {
      var user = _.find(users, function(_user) {
        return _user.id == id;
      });
      if (user) {
        mediator.publish('done:' + topicLoad + ':' + id, user);
      } else {
        mediator.publish('error:' + topicLoad + ':' + id, 'No such user');
      }
    }, 0);
  });

  var topicSave = 'user:save';
  console.log('Subscribing to mediator topic:', topicSave);
  mediator.subscribe(topicSave, function(user) {
    setTimeout(function() {
      var index = _.findIndex(users, function(_user) {
        return _user.id == user.id;
      });
      users[index] = user;
      console.log('Saved user:', user);
      mediator.publish('done:' + topicSave + ':' + user.id, user);
    }, 0);
  });

  var topicCreate = 'user:create';
  console.log('Subscribing to mediator topic:', topicCreate);
  mediator.subscribe(topicCreate, function(user) {
    setTimeout(function() {
      user.id = users.length;
      users.push(user);
      console.log('Created user:', user);
      mediator.publish('done:' + topicCreate + ':' + user.createdTs, user);
    }, 0);
  });

}
