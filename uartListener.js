/*
 * Copyright reelyActive 2016-2017
 * We believe in an open Internet of Things
 */

const tessel = require('tessel');
const util = require('util');
const events = require('events');

const REEL_BAUD_RATE = 230400;


/**
 * UARTListener Class
 * Listens for data on UART and emits the included data
 * @param {String} port Tessel port on which to listen.
 * @constructor
 * @extends {events.EventEmitter}
 */
function UARTListener(port) {
  var self = this;

  self.origin = 'UART:' + port;
  self.uart = new tessel.port[port].UART({
    baudrate: REEL_BAUD_RATE
  });

  events.EventEmitter.call(this);

  // Emit UART data and pulse green LED
  self.uart.on('data', function (data) {
    tessel.led[2].on();
    self.emit('data', data.toString('hex'), self.origin);
    tessel.led[2].off();
  });

}
util.inherits(UARTListener, events.EventEmitter);

module.exports = UARTListener;
