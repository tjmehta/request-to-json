var describe = global.describe
var it = global.it

var http = require('http')

var expect = require('code').expect
var express = require('express')

var reqToJSON = require('../index.js')

var PORT = process.env.PORT || 3030

describe('request-to-json', function () {
  describe('http server', function () {
    beforeEach(function (done) {
      var self = this
      this.server = http.createServer(function (req, res) {
        self.req = req
        self.json = reqToJSON(req)
        res.write('hello world')
        res.end('hello world')
      })
      this.server.listen(PORT, done)
    })
    afterEach(function (done) {
      this.server.close(done)
    })

    describe('post', function () {
      it('should json a request', function (done) {
        var self = this
        var opts = {
          method: 'POST',
          port: PORT,
          path: '/path?key=val'
        }
        var req = http.request(opts, function () {
          expect(self.json).to.deep.equal({
            headers: {
              host: 'localhost:3030',
              connection: 'close',
              'transfer-encoding': 'chunked'
            },
            httpVersion: '1.1',
            method: 'POST',
            trailers: {},
            url: '/path?key=val',
            host: 'localhost:3030',
            hostname: 'localhost',
            port: '3030',
            protocol: 'http:',
            query: { key: 'val' },
            path: '/path',
            fullUrl: 'http://localhost:3030/path?key=val'
          })
          done()
        })
        req.write('body')
        req.end()
      })
    })
  })

  describe('express', function () {
    beforeEach(function (done) {
      var self = this
      this.app = express()
      this.app.use(function (req, res) {
        self.req = req
        self.json = reqToJSON(req, true)
        res.write('hello world')
        res.end('hello world')
      })
      this.server = this.app.listen(PORT, done)
    })
    afterEach(function (done) {
      this.server.close(done)
    })

    describe('post', function () {
      it('should json a request', function (done) {
        var self = this
        var opts = {
          method: 'POST',
          port: PORT,
          path: '/path?key=val'
        }
        var req = http.request(opts, function () {
          expect(self.json).to.deep.equal({
            fresh: false,
            headers: {
              host: 'localhost:3030',
              connection: 'close',
              'transfer-encoding': 'chunked'
            },
            httpVersion: '1.1',
            ip: '::ffff:127.0.0.1',
            ips: [],
            method: 'POST',
            trailers: {},
            params: {},
            query: { key: 'val' },
            rawHeaders: [
              'Host',
              'localhost:3030',
              'Connection',
              'close',
              'Transfer-Encoding',
              'chunked'
            ],
            rawTrailers: [],
            stale: true,
            subdomains: [],
            url: '/path?key=val',
            originalUrl: '/path?key=val',
            host: 'localhost:3030',
            hostname: 'localhost',
            port: '3030',
            protocol: 'http:',
            path: '/path',
            fullUrl: 'http://localhost:3030/path?key=val'
          })
          done()
        })
        req.write('body')
        req.end()
      })
    })
  })
})
