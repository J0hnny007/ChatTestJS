var express = require('express');
var mongoose = require('mongoose');

var app = express();

var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname));

var dbUrl = 'mongodb://username:pass@ds257981.mlab.com:57981/simple-chat'

mongoose.connect(dbUrl , (err) => { 
    console.log('mongodb connected',err);
 })

var Message = mongoose.model('Message',{ name : String, message : String})

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })