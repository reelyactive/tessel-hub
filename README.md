tessel-hub
==========

Reel data forwarder using the Tessel 2 platform as a hub.  Expects the reel to be connected via the Tessel 2's UART.


Prerequisites
-------------

Both __Node.js__ and the __t2-cli__ tool are prerequisites.

Install Node.js from [nodejs.org](https://nodejs.org).  Install the t2-cli tool as described at [tessel.github.io/t2-start/](http://tessel.github.io/t2-start/).


Installation
------------

- Clone this repository
- From the command line, browse to the root of this repository and run:

    npm install

The code is now ready and accessible on your computer.


Configuration
-------------

All configuration parameters can be found in the file config.js.  Update only this file, as required.  The default configuration relays the data to [Pareto](https://getpareto.com).


Programming
-----------

- Connect the Tessel to your PC via USB (wait ~30 secs for it to boot)
- From the command line, browse to the root of this repository and run:

    t2 push index.js

The code will be pushed to flash memory on the Tessel and will run every time it boots.


Required Firmware Modification
------------------------------

The Tessel 2's default firmware is (artificially) limited to 115200bps, however, the reel streams data at 230400bps.  To make the change in the Tessel firmware (only required once), connect the Tessel 2 via both USB and LAN and then from the command line run:

    t2 provision
    t2 root
    vi /usr/lib/node/tessel-exports.js

Change 115200 to 230400 (around line 1055), then save and exit.
