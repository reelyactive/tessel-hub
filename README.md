tessel-hub
==========

Enterprise-grade hub software for the Tessel 2 platform.  Expects the reel to be connected via the Tessel 2's UART.


Installation
------------

- Clone this repository
- Connect the Tessel to your PC via USB (wait ~30 secs for it to boot)
- From the command line, browse to the root of this repository and run:

    t2 push index.js

The code will be pushed to flash memory on the Tessel and will run every time it boots.


Configuration
-------------

The default configuration relays the data to [Pareto](https://getpareto.com).  Change the _address_ in relay.addForwarder() as required.


Required Firmware Modification
------------------------------

The reel streams data at 230400bps while the Tessel 2's default firmware is (artificially) limited to 115200bps.  To make the change in the firmware, connect the Tessel 2 via both USB and LAN and then from the command line run:

    t2 provision
    t2 root
    vi /usr/lib/node/tessel-exports.js

Change 115200 to 230400 (around line 1055), then save and exit.

