/**
* CONFIDENTIAL
* Copyright 2016 Red Hat, Inc. and/or its affiliates.
* This is unpublished proprietary source code of Red Hat.
**/
'use strict';

var _ = require('lodash');

var users = require('./data.json');

module.exports = function(mediator) {
  var topicList = 'wfm:user:list';
  console.log('Subscribing to mediator topic:', topicList);
  mediator.subscribe(topicList, function() {
    setTimeout(function() {
      mediator.publish('done:' + topicList, users);
    }, 0);
  });

  var topicLoad = 'wfm:user:read';
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

  var topicUsernameLoad = 'wfm:user:username:read';
  console.log('Subscribing to mediator topic:', topicUsernameLoad);
  mediator.subscribe(topicUsernameLoad, function(username) {
    setTimeout(function() {
      var user = _.find(users, function(_user) {
        return _user.username == username;
      });
      if (user) {
        mediator.publish('done:' + topicUsernameLoad + ':' + username, user);
      } else {
        mediator.publish('error:' + topicUsernameLoad + ':' + username, 'No such user');
      }
    }, 0);
  });

  var topicSave = 'wfm:user:update';
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

  var topicCreate = 'wfm:user:create';
  console.log('Subscribing to mediator topic:', topicCreate);
  mediator.subscribe(topicCreate, function(user) {
    setTimeout(function() {
      user.id = users.length;
      users.push(user);
      console.log('Created user:', user);
      mediator.publish('done:' + topicCreate + ':' + user.createdTs, user);
    }, 0);
  });

  var topicDelete = 'wfm:user:delete';
  console.log('Subscribing to mediator topic:', topicSave);
  mediator.subscribe(topicDelete, function(user) {
    setTimeout(function() {
      var removals = _.remove(users, function(_object) {
        return user.id === _object.id;
      });
      var removed = removals.length ? removals[0] : null;
      console.log('Deleted user:', removed);
      mediator.publish('done:' + topicDelete + ':' + removed.id, user);
    }, 0);
  });

}
