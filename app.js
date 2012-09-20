/**
 * Load and configure RequireJS
 * @see http://requirejs.org/docs/node.html
 */
var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

/**
 * Load dependencies and start Express
 * @see http://expressjs.com/guide.html
 */
requirejs(['http', 'path', 'express', './routes'], function (http, path, express, routes) {
  var app = express();
  
  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
  });
  
  app.configure('development', function(){
    app.use(express.errorHandler());
  });
  
  app.get('/', routes.index);
  
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });    
});