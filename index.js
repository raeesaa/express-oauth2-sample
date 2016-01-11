/**
 **
 **
 **/

var express = require('express');
var oauthserver = require('oauth2-server');
var mongoose = require('mongoose');

var app = express();

mongoose.connect("mongodb://localhost:27017/oauth_sample");

app.oauth = oauthserver({
	model: require('./model'),
	grants: ['password'],
	debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function(req, res) {
	res.json({
		message: "Sample json response"
	});
});


app.use(app.oauth.errorHandler());

app.listen(3000, function() {
	console.log("Express server listening on port 3000");
});
