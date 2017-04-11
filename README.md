tessel-hub
==========

Enterprise-grade hub software for the Tessel 2 platform.  Expects the reel to be connected via the Tessel 2's UART.


Required Firmware Modification
------------------------------

The reel streams data at 230400bps while the Tessel 2's default firmware is (artificially) limited to 115200bps.  To make the change in the firmware, connect the Tessel 2 via both USB and LAN and then from the command line run:

    t2 provision
    t2 root
    vi /usr/lib/node/tessel-exports.js

Change 115200 to 230400 (around line 1055), then save and exit.

