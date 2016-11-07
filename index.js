var url = require('url')

var defaults = require('101/defaults')
var pick = require('101/pick')

var urlKeys =

module.exports = reqToJSON

/**
 * return a json representation of a request
 * @param  {IncomingMessage} req request (client incoming-message or client-request)
 * @param  {Array} additional additional properties to pick from request
 * @return {Object} resJSON
 */
function reqToJSON (req, additional) {
  additional = additional || []
  if (additional === true) {
    additional = [
      'rawHeaders',
      'rawTrailers',
      // express/koa
      'fresh',
      'cookies',
      'ip',
      'ips',
      'stale',
      'subdomains'
    ]
  }
  var keys = [
    'body',
    'headers',
    'httpVersion',
    'method',
    'trailers',
    'url',
    'socket.remoteAddress',
    // express/koa
    'originalUrl',
    'params',
    'query'

  ].concat(additional).sort()
  var json = pick(req, keys)
  defaults(json, getParsedUrl(req))
  return json
}

function getParsedUrl (req) {
  var protocol = req.connection.encrypted ? 'https:' : 'http:'
  var host = req.headers && req.headers.host
  var fullUrl = host
    ? [protocol, '//', host, req.url].join('')
    : null
  var parsedUrl = pick(url.parse(fullUrl || req.url, true), [
    'host',
    'hostname',
    'pathname',
    'port',
    'protocol',
    'query'
  ])
  // move pathname -> path
  parsedUrl.protocol = parsedUrl.protocol || protocol
  parsedUrl.path = parsedUrl.pathname
  delete parsedUrl.pathname
  // set fullUrl
  parsedUrl.fullUrl = fullUrl
  // set on req
  return parsedUrl
}
