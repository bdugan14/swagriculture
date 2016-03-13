var config = require("./config.js");
var express = require("express");
var app = express();
var request = require("wiki.js");
var bodyParser = require('body-parser');
var twilioHandler = require('./twilio.js');

// client.sendMessage({
// 	to: '',
// 	from:'',
// 	body:'yo you sexy mofo'
	
// }, function(err, responseData){
// 	if(!err){

// 		console.log(responseData.from); // outputs "+14506667788"
//         console.log(responseData.body); // outputs "word to your mother."

// 	}

// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res){
    console.log('receiving get request');
    res.send('you only yolo once');
});

// async mock of Ji's wikiQuerying function
function _mockQuerier (stringOfQueries, cb) {
    console.log("calling mockQuerier");
    console.log("stringofQueries: ");
    var mockQueryResp = 'pretend this is a response for '+ stringOfQueries;
    setTimeout(function(){
        cb(mockQueryResp);
    }, 0);
}

//sends success to Twilio, dunno if they do anything with it though.
function _sendSuccess (res) {
    res.sendStatus(201);
}

app.post('/incoming', function(req, res) {
    console.log("processing incoming text");
    console.log("req.body: ", req.body);
    var replyPhoneNumber = req.body.From;
    var queryText = req.body.Body;

    //TODO: change this to the actual wiki querier
    _mockQuerier(queryText, function (queryResp) {
        twilioHandler.sendSMSReply(queryResp, replyPhoneNumber, _sendSuccess.bind(null, res));
    });

});

app.listen(9000, '127.0.0.1', function(){
    console.log("listening on port ", 9000);
});