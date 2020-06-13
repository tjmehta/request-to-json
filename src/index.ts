import { Context as KoaContext, Request as KoaRequest } from 'koa'

import { Request as ExpressRequest } from 'express'
import { IncomingMessage } from 'http'
import stringify from 'fast-safe-stringify'

export interface IncomingMessageJSON {
  aborted: boolean
  httpVersion: string
  complete: boolean
  headers: IncomingMessage['headers']
  trailers: IncomingMessage['trailers']
  query?: ExpressRequest['query']
  statusCode?: number
  statusMessage?: string
  method?: string
  url?: string
  originalUrl?: string
}

export interface ExpressRequestJSON {
  protocol: ExpressRequest['protocol']
  secure: ExpressRequest['secure']
  ip: ExpressRequest['ip']
  ips: ExpressRequest['ips']
  subdomains: ExpressRequest['subdomains']
  path: ExpressRequest['path']
  hostname: ExpressRequest['hostname']
  host: ExpressRequest['host']
  fresh: ExpressRequest['fresh']
  stale: ExpressRequest['stale']
  xhr: ExpressRequest['xhr']
  body: ExpressRequest['body']
  cookies: ExpressRequest['cookies']
  params: ExpressRequest['params']
  query: ExpressRequest['query']
  route: ExpressRequest['route']
  signedCookies: ExpressRequest['signedCookies']
  originalUrl: ExpressRequest['originalUrl']
  baseUrl: ExpressRequest['baseUrl']
  method: ExpressRequest['method']
  url: ExpressRequest['url']
}

export interface KoaRequestJSON {
  headers: KoaRequest['headers']
  method: KoaRequest['method']
  url: KoaRequest['url']
  originalUrl: KoaRequest['originalUrl']
  origin: KoaRequest['origin']
  href: KoaRequest['href']
  path: KoaRequest['path']
  query: KoaRequest['query']
  host: KoaRequest['host']
  hostname: KoaRequest['hostname']
  fresh: KoaRequest['fresh']
  stale: KoaRequest['stale']
  protocol: KoaRequest['protocol']
  secure: KoaRequest['secure']
  ip: KoaRequest['ip']
  ips: KoaRequest['ips']
  subdomains: KoaRequest['subdomains']
}

export interface KoaContextJSON {
  headers: KoaContext['headers']
  method: KoaContext['method']
  url: KoaContext['url']
  originalUrl: KoaContext['originalUrl']
  origin: KoaContext['origin']
  href: KoaContext['href']
  path: KoaContext['path']
  query: KoaContext['query']

  host: KoaContext['host']
  hostname: KoaContext['hostname']
  fresh: KoaContext['fresh']
  stale: KoaContext['stale']
  protocol: KoaContext['protocol']
  secure: KoaContext['secure']
  ip: KoaContext['ip']
  ips: KoaContext['ips']
  subdomains: KoaContext['subdomains']
}

export default function requestToJSON(
  req: IncomingMessage | ExpressRequest | KoaRequest | KoaContext,
): IncomingMessageJSON | ExpressRequestJSON | KoaRequestJSON {
  let json = {}

  const im = req as IncomingMessage
  const imJSON = json as IncomingMessageJSON
  if (null != im.aborted) imJSON.aborted = im.aborted
  if (null != im.httpVersion) imJSON.httpVersion = im.httpVersion
  if (null != im.complete) imJSON.complete = im.complete
  if (null != im.headers) imJSON.headers = im.headers
  if (null != im.trailers) imJSON.trailers = im.trailers
  if (null != im.statusCode) imJSON.statusCode = im.statusCode
  if (null != im.statusMessage) imJSON.statusMessage = im.statusMessage
  if (null != im.method) imJSON.method = im.method
  if (null != im.url) imJSON.url = im.url
  // @ts-ignore
  if (null != im.query) imJSON.query = im.query
  // @ts-ignore
  if (null != im.originalUrl) imJSON.originalUrl = im.originalUrl

  const expressReq = req as ExpressRequest
  const expressJSON = json as ExpressRequestJSON
  if (null != expressReq.protocol) expressJSON.protocol = expressReq.protocol
  if (null != expressReq.secure) expressJSON.secure = expressReq.secure
  if (null != expressReq.ip) expressJSON.ip = expressReq.ip
  if (null != expressReq.ips) expressJSON.ips = expressReq.ips
  if (null != expressReq.subdomains)
    expressJSON.subdomains = expressReq.subdomains
  if (null != expressReq.path) expressJSON.path = expressReq.path
  if (null != expressReq.hostname) expressJSON.hostname = expressReq.hostname
  if (null != expressReq.host) expressJSON.host = expressReq.host
  if (null != expressReq.fresh) expressJSON.fresh = expressReq.fresh
  if (null != expressReq.stale) expressJSON.stale = expressReq.stale
  if (null != expressReq.xhr) expressJSON.xhr = expressReq.xhr
  if (null != expressReq.body) expressJSON.body = expressReq.body
  if (null != expressReq.cookies) {
    expressJSON.cookies = JSON.parse(stringify(expressReq.cookies))
    delete expressJSON.cookies.request
    delete expressJSON.cookies.response
  }
  if (null != expressReq.params) expressJSON.params = expressReq.params
  if (null != expressReq.query) expressJSON.query = expressReq.query
  if (null != expressReq.route) expressJSON.route = expressReq.route
  if (null != expressReq.signedCookies)
    expressJSON.signedCookies = expressReq.signedCookies
  if (null != expressReq.originalUrl)
    expressJSON.originalUrl = expressReq.originalUrl
  if (null != expressReq.baseUrl) expressJSON.baseUrl = expressReq.baseUrl

  const koaReq = req as KoaRequest | KoaContext
  const koaJSON = json as KoaRequestJSON
  if (null != koaReq.headers) koaJSON.headers = koaReq.headers
  if (null != koaReq.method) koaJSON.method = koaReq.method
  if (null != koaReq.url) koaJSON.url = koaReq.url
  if (null != koaReq.originalUrl) koaJSON.originalUrl = koaReq.originalUrl
  if (null != koaReq.origin) koaJSON.origin = koaReq.origin
  if (null != koaReq.href) koaJSON.href = koaReq.href
  if (null != koaReq.path) koaJSON.path = koaReq.path
  if (null != koaReq.query) koaJSON.query = koaReq.query
  if (null != koaReq.host) koaJSON.host = koaReq.host
  if (null != koaReq.hostname) koaJSON.hostname = koaReq.hostname
  if (null != koaReq.fresh) koaJSON.fresh = koaReq.fresh
  if (null != koaReq.stale) koaJSON.stale = koaReq.stale
  if (null != koaReq.protocol) koaJSON.protocol = koaReq.protocol
  if (null != koaReq.secure) koaJSON.secure = koaReq.secure
  if (null != koaReq.ip) koaJSON.ip = koaReq.ip
  if (null != koaReq.ips) koaJSON.ips = koaReq.ips
  if (null != koaReq.subdomains) koaJSON.subdomains = koaReq.subdomains

  return json as IncomingMessageJSON | ExpressRequestJSON | KoaRequestJSON
}
