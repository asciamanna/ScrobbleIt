'use strict;'
var express = require('express'),
		path = require('path'),
		stylus = require('stylus'),
		nib = require('nib'),
		logger = require('morgan');

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(stylus.middleware( 
		{ src: path.join(__dirname, 'public'), compile: compile }
));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
	res.render('index', { title: 'Scrobble It!' });
});
app.listen(3000);

