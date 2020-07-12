var express = require('express');
var app = express();
var compression = require('compression');
var helmet = require('helmet');
var listen = require('socket.io');
var sanitizeHtml = require('sanitize-html');
var db = require('./lib/db');

var indexRouter = require('./routes/index');
var releaseRouter = require('./routes/release');
var drawRouter = require('./routes/draw');
var stockRouter = require('./routes/stock');
var sitesRouter = require('./routes/sites');

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

sneakerIdParameter = "";
sizeIdParameter = undefined;

app.use(express.static('public'));
app.use(compression());
app.use(helmet());

app.use('/', indexRouter);
app.use('/page/release', releaseRouter);
app.use('/page/draw', drawRouter);
app.use('/page/stock', stockRouter);
app.use('/page/sites', sitesRouter);
 
app.use(function(request, response, next) {
    response.status(404).send("Sorry can't find that!");
});

var server = app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});

var io = listen(server);
require('./lib/release-socket')(io, db);
require('./lib/draw-socket')(io);
require('./lib/stock-chart-socket')(io, db);
require('./lib/sites-socket')(io, db);
