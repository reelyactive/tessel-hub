/*
 * Copyright reelyActive 2016-2017
 * We believe in an open Internet of Things
 */

var tessel = require('tessel');
var http = require('http');
var express = require('express');
var reelay = require('reelay');
var uartListener = require('./uartListener');

// Create the Express app, server and router
var app = express();
var server = http.createServer(app);
var router = express.Router();

// Define the Express routes
app.use('/', express.static(__dirname + '/web'));
app.use('/', router);

// Listen on port 80
server.listen(80, function() { console.log('Express server running'); });

// Listen on UART (Port A) and bind barnowl to the data stream
var uart = new uartListener('A');

// Enable the relay
var relay = new reelay();
relay.addListener( { protocol: 'event', path: uart, enableMixing: false } );
relay.addForwarder( { protocol: 'udp', port: 50000,
                      address: 'pareto.reelyactive.com' } );

// Blue LED continuously toggles to indicate program is running
setInterval(function() { tessel.led[3].toggle(); }, 500);
