var port = 3000;
var express = require('express')
var ejs = require('ejs')
var layouts = require('express-ejs-layouts')
var app = express();

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('public'));

//require homeController.js for our renderIndex() function
var homeController = require('./controllers/homeController');

//add the route for our chat
app.get('/', homeController.renderIndex);

var server = app.listen(port, () => {
  console.log(`Sever listening on port ${port}`);
});

var io = require('socket.io')(server);
var socketController = require('./controllers/socketController.js')(io);