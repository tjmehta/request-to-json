# request-to-json [![Build Status](https://travis-ci.org/tjmehta/request-to-json.svg?branch=master)](https://travis-ci.org/tjmehta/request-to-json)

Returns a JSON representation of request (supports koa/express requests props)

# Installation

```bash
npm i --save request-to-json
```

# Usage

#### Supports both ESM and CommonJS

```js
// esm
import reqToJSON from 'request-to-json'
// commonjs
const reqToJSON = require('request-to-json')
```

#### HTTP server request to JSON

```js
import http from 'http'
import reqToJSON from 'request-to-json'

http.createServer(function (req) {
  reqToJSON(req)
  /*
  {
    "aborted": false,
    "complete": true,
    "headers": Object {
      "connection": "close",
      "host": "localhost:3033",
    },
    "httpVersion": "1.1",
    "method": "GET",
    "trailers": Object {},
    "url": "/",
  }
  */
})
```

#### Express request to JSON

```js
import express from 'express'
import reqToJSON from 'request-to-json'

const app = express()
app.get('user/:id', function (req) {
  reqToJSON(req)
  /*
  {
    "aborted": false,
    "baseUrl": "",
    "complete": true,
    "fresh": false,
    "headers": Object {
      "connection": "close",
      "host": "localhost:3033",
    },
    "host": "localhost",
    "hostname": "localhost",
    "httpVersion": "1.1",
    "ips": Array [],
    "method": "GET",
    "originalUrl": "/",
    "params": Object {},
    "path": "/",
    "protocol": "http",
    "query": Object {},
    "secure": false,
    "stale": true,
    "subdomains": Array [],
    "trailers": Object {},
    "url": "/",
    "xhr": false,
  }
  */
})
```

#### Koa request to JSON

```js
import koa from 'koa'
import reqToJSON from 'request-to-json'

const app = new Koa()
app.use(async function (ctx, next) {
  reqToJSON(ctx)
  /*
  {
    "body": "hello world",
    "cookies": Object {
      "secure": false,
    },
    "fresh": false,
    "headers": Object {
      "connection": "close",
      "host": "localhost:3033",
      "x-custom": "custom",
    },
    "host": "localhost:3033",
    "hostname": "localhost",
    "href": "http://localhost:3033/",
    "ip": "",
    "ips": Array [],
    "method": "GET",
    "origin": "http://localhost:3033",
    "originalUrl": "/",
    "path": "/",
    "protocol": "http",
    "query": Object {},
    "secure": false,
    "stale": true,
    "subdomains": Array [],
    "url": "/",
  }
  */
  reqToJSON(ctx.request)
  /*
  {
    "fresh": false,
    "headers": Object {
      "connection": "close",
      "host": "localhost:3033",
      "x-custom": "custom",
    },
    "host": "localhost:3033",
    "hostname": "localhost",
    "href": "http://localhost:3033/",
    "ip": "",
    "ips": Array [],
    "method": "GET",
    "origin": "http://localhost:3033",
    "originalUrl": "/",
    "path": "/",
    "protocol": "http",
    "query": Object {},
    "secure": false,
    "stale": true,
    "subdomains": Array [],
    "url": "/",
  }
  */
})
```

# License

MIT
