if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function(require) {
  var routes = {};
  
  routes.index = function(req, res) {
    res.render('index', { title: 'Express' });
  };
  
  return routes;
});