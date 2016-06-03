# request-to-json [![Build Status](https://travis-ci.org/tjmehta/request-to-json.svg?branch=master)](https://travis-ci.org/tjmehta/request-to-json)
Returns a JSON representation of request (supports koa/express requests props)

# Installation
```bash
npm i --save request-to-json
```

# Usage
http server request
```js
var http = require('http')
var reqToJSON = require('request-to-json')

http.createServer(function (req) {
  // Default behavior
  reqToJSON(req)
  /*
  {
    headers: {<headers>},
    body: 'hello',
    httpVersion: '1.1',
    method: 'GET',
    trailers: {},
    url: '/?foo=bar',
    // url parsed properties
    host: 'localhost:80'
    hostname: 'localhost',
    port: '80',
    protocol: 'http:',
    query: { foo: bar },
    path: '/',
    fullUrl: 'http://localhost:80/?foo=bar'
  }
  */
  // Pass true to include rawHeaders and rawTrailers
  reqToJSON(res, true) // true will return raw headers and trailers
  /*
  {
    headers: {<headers>},
    body: 'hello',
    httpVersion: '1.1',
    method: 'GET',
    trailers: {},
    url: '/?foo=bar',
    // additional properties
    rawHeaders: [], // not available in node@v0.10.x
    rawTrailers: [],
    // url parsed properties
    host: 'localhost:80'
    hostname: 'localhost',
    port: '80',
    protocol: 'http:',
    query: { foo: bar },
    path: '/',
    fullUrl: 'http://localhost:80/?foo=bar'
  }
  */
  // Pass array of strings to include custom properties (supports keypaths)
  req.customProp1 = 'hai'
  reqToJSON(res, ['customProp1']) // true will return raw headers and trailers
  /*
  {
    headers: {<headers>},
    body: 'hello',
    httpVersion: '1.1',
    method: 'GET',
    trailers: {},
    url: 'http://localhost:80?foo=bar',
    // url parsed properties
    host: 'localhost:80'
    hostname: 'localhost',
    port: '80',
    protocol: 'http:',
    query: { foo: bar },
    path: '/?foo=bar'
    pathname: '/,
    // custom
    customProp1: 'hai'
  }
  */
})
```

express request (koa request should have same properties)
```js
var app = require('express')()
var reqToJSON = require('request-to-json')

app.get('user/:id', function (req) {
  // Default behavior
  reqToJSON(req)
  /*
  {
    headers: {<headers>},
    body: 'hello',
    httpVersion: '1.1',
    method: 'GET',
    trailers: {},
    url: '/user/abcdef?foo=bar',
    // express request properties
    originalUrl: '/user/abcdef?foo=bar',
    params: { id: 'abcdef' },
    query: { foo: bar },
    length: '<content-length>',
    // url parsed properties
    host: 'localhost:80'
    hostname: 'localhost',
    port: '80',
    protocol: 'http:',
    // query: { foo: bar }, // uses express req's
    path: '/',
    fullUrl: 'http://localhost:80/?foo=bar'
  }
  */
  // Pass true to include rawHeaders and rawTrailers
  reqToJSON(res, true) // true will return raw headers and trailers
  /*
  {
    headers: {<headers>},
    body: 'hello',
    httpVersion: '1.1',
    method: 'GET',
    trailers: {},
    url: '/user/abcdef?foo=bar',
    // express request properties
    originalUrl: '/user/abcdef?foo=bar',
    params: { id: 'abcdef' },
    query: { foo: bar },
    length: '<content-length>',
    // additional properties
    rawHeaders: [],
    rawTrailers: [],
    // additional express properties
    fresh: true,
    cookies: '<cookies>',
    ip: '<ip>',
    ips: [<ips>],
    stale: false,
    subdomains: [<subdomains>],
    // url parsed properties
    host: 'localhost:80'
    hostname: 'localhost',
    port: '80',
    protocol: 'http:',
    // query: { foo: bar }, // uses express req's
    path: '/',
    fullUrl: 'http://localhost:80/?foo=bar'
  }
  */
  // Pass array of strings to include custom properties (supports keypaths)
  req.customProp1 = 'hai'
  reqToJSON(res, ['customProp1']) // true will return raw headers and trailers
  /*
  {
    headers: {<headers>},
    body: 'hello',
    httpVersion: '1.1',
    method: 'GET',
    trailers: {},
    url: '/user/abcdef?foo=bar',
    // express request properties
    originalUrl: '/user/abcdef?foo=bar',
    params: { id: 'abcdef' },
    query: { foo: bar },
    length: '<content-length>',
    // additional user properties
    customProp1: 'hai'
    // url parsed properties
    host: 'localhost:80'
    hostname: 'localhost',
    port: '80',
    protocol: 'http:',
    // query: { foo: bar }, // uses express req's
    path: '/',
    fullUrl: 'http://localhost:80/?foo=bar'
  }
  */
})
```

# License
MIT