var express = require('express');
var app = express();
var routes = require(__dirname + "/routes/routes");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('cookie-session');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Serving static folders
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));

//Application Level Settings
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

//Middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(require('express-flash')());
app.use('/', routes);
//
app.get('/', function(req, res) {
    res.render("socket", {
        title: "Socket Page"
    });
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});
// Routes

//


http.listen(3000, function() {
    console.log('Server listening on port 3000');
});
