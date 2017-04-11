/*
 * Copyright reelyActive 2016-2017
 * We believe in an open Internet of Things
 */

var tessel = require('tessel');
var http = require('http');
var express = require('express');
var barnowl = require('barnowl');
var reelib = require('reelib');
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

// User-configurable: hostname and port
var options = { hostname: 'pareto.reelyactive.com', port: 80 };

// See barnowl documentation for additional options
var middleware = new barnowl( { enableMixing: true,
                                mixingDelayMilliseconds: 1000 } );

// See reelib documentation for options
var eventqueue = new reelib.event.eventqueue({
    keepAliveMilliseconds: 2500,
    disappearanceMilliseconds: 15000
});

// Listen on UART (Port A) and bind barnowl to the data stream
var uart = new uartListener('A');
middleware.bind( { protocol: 'event', path: uart } ); 

// Green LED is on when detection events are relayed to remote server
middleware.on('visibilityEvent', function(tiraid) {
  if(reelib.tiraid.isValid(tiraid)) {
    eventqueue.insert(tiraid, function(event) {
      if(event) {
        tessel.led[2].on();
        event.tiraid = tiraid;
        reelib.event.postUpdate(options, event, function(err, event, message) {
          tessel.led[2].off();
        });
      }
    });
  }
});

// Reel status events are also relayed to remote server
middleware.on('reelEvent', function(event) {
  reelib.reel.putStatusUpdate(options, event, function() { });
});

// Blue LED continuously toggles to indicate program is running
setInterval(function() { tessel.led[3].toggle(); }, 500);
