import { IncomingMessage, Server, createServer, request } from 'http'
import Koa, { Context as KoaContext, Request as KoaRequest } from 'koa'
import express, { Request as ExpressRequest } from 'express'

import requestToJSON from '../index'

const PORT = process.env.PORT || 3033

describe('request-to-json', () => {
  it('should convert a http incomingmessage to json', async () => {
    const req = await getIncomingMessage()
    expect(requestToJSON(req)).toMatchInlineSnapshot(`
      Object {
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
    `)
  })
  it('should convert a express req to json', async () => {
    const req = await getExpressReq()
    expect(requestToJSON(req)).toMatchInlineSnapshot(`
      Object {
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
    `)
  })
  it('should convert a koa req to json', async () => {
    const req = await getKoaReq()
    expect(requestToJSON(req)).toMatchInlineSnapshot(`
      Object {
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
    `)
  })
  it('should convert a koa ctx to json', async () => {
    const ctx = await getKoaCtx()
    expect(requestToJSON(ctx)).toMatchInlineSnapshot(`
      Object {
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
    `)
  })
})

async function getIncomingMessage(): Promise<IncomingMessage> {
  let server: Server | undefined
  const reqPromise = new Promise<IncomingMessage>((resolve) => {
    server = createServer((req, res) => {
      res.statusCode = 200
      res.write('hello world')
      res.end()
      resolve(req)
    })
  })
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(PORT, resolve)
  })
  await new Promise((resolve) => {
    const req = request(`http://localhost:${PORT}`, (res) => {
      res.pipe(process.stdout)
      res.on('end', resolve)
      resolve()
    })
    req.end()
  })
  await new Promise((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  )
  return await reqPromise
}

async function getExpressReq(): Promise<ExpressRequest> {
  const app = express()
  const reqPromise = new Promise<ExpressRequest>((resolve) => {
    app.use((req, res) => {
      res.status(200)
      res.end('hello world')
      resolve(req)
    })
  })
  let server
  await new Promise((resolve) => {
    server = app.listen(PORT, resolve)
  })
  await new Promise((resolve) => {
    const req = request(`http://localhost:${PORT}`, (res) => {
      res.pipe(process.stdout)
      res.on('end', resolve)
      resolve()
    })
    req.end()
  })
  await new Promise((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  )
  return await reqPromise
}

async function getKoaReq(): Promise<KoaRequest> {
  const app = new Koa()
  const reqPromise = new Promise<KoaRequest>((resolve) => {
    app.use(async (ctx, next) => {
      ctx.status = 200
      ctx.body = 'hello world'
      resolve(ctx.request)
    })
  })
  let server
  await new Promise((resolve) => {
    server = app.listen(PORT, resolve)
  })
  await new Promise((resolve) => {
    const req = request(`http://localhost:${PORT}`, (res) => {
      res.pipe(process.stdout)
      res.on('end', resolve)
      resolve()
    })
    req.setHeader('x-custom', 'custom')
    req.end()
  })
  await new Promise((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  )
  return await reqPromise
}

async function getKoaCtx(): Promise<KoaContext> {
  const app = new Koa()
  const reqPromise = new Promise<KoaContext>((resolve) => {
    app.use(async (ctx, next) => {
      ctx.status = 200
      ctx.body = 'hello world'
      resolve(ctx)
    })
  })
  let server
  await new Promise((resolve) => {
    server = app.listen(PORT, resolve)
  })
  await new Promise((resolve) => {
    const req = request(`http://localhost:${PORT}`, (res) => {
      res.pipe(process.stdout)
      res.on('end', resolve)
      resolve()
    })
    req.setHeader('x-custom', 'custom')
    req.end()
  })
  await new Promise((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  )
  return await reqPromise
}
