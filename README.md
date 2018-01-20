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


License
-------

MIT License

Copyright (c) 2017-2018 reelyActive

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
