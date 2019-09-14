web-proxy-stress-backend
=====

This repo is a docker-compose file I use for stress testing proxies. 
It provides some endpoints to download files of various sizes and also a websocket echo server endpoint.

# Endpoints
- `/ws` - websocket endpoint
- `/fast` - fast 200 reply
- `/slow` - 2 second reply
- `/veryslow` - 10 second reply
- `/slow2` - send some data, flush wait 2 seconds send some more data
- `/files` - 10kb.bin, 100kb.bin, 1mb.bin, 20mb.bin, 800kb.bin

# Recommended clients for testing
* HTTP requests - bombardier [original repo](https://github.com/codesenberg/bombardier) or [my patched version](https://github.com/kostyay/bombardier) which provides a summary by status codes.
* WebSocket requests - the excellent [wsstat](https://github.com/Fitblip/wsstat) tool