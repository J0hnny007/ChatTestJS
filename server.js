var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var app = express();

var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname));

var dbUrl = ''

var Message = mongoose.model('Message', { name: String, message: String })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        res.sendStatus(200);
    })
})
