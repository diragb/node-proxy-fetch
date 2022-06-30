# node-proxy-fetch

[![npm](https://img.shields.io/badge/npm-node--proxy--fetch-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/node-proxy-fetch)
[![npm version](https://img.shields.io/npm/v/node-proxy-fetch.svg?style=flat-square)](https://www.npmjs.com/package/node-proxy-fetch)
[![npm downloads](https://img.shields.io/npm/dm/node-proxy-fetch.svg?style=flat-square)](https://www.npmjs.com/package/node-proxy-fetch)
[![sponsors](https://img.shields.io/github/sponsors/diragb)](https://github.com/sponsors/diragb)

Fetch web content behind a firewall.

# Inspiration
Fetching web content from other websites from client-side usually either results in a CORS or a `403 Forbidden` error. A typical workaround for this is to fetch it via a proxy server, but this is also usually blocked due to *"Are you a human?"* checks.

**node-proxy-fetch** uses Puppeteer to get the actual page content, grabs the generated HTML, transforms and serves it.

# Usage
In your proxy server code, assuming you're using Express:
```ts
// Packages:
import express from 'express'
import fetch from 'node-proxy-fetch'


// Constants:
const app = express()


// Functions:
app.get('/', async (req, res) => {
  const content = await fetch({
    baseURL: 'https://www.npmjs.com/',
    targetURL: 'https://www.npmjs.com/package/solid-custom-scrollbars'
  })
  res.send(content)
})

app.listen(3000)
```

# API
## baseURL
`string`

The base URL with the pattern `protocol://domain.tld`. All relative paths in the fetched HTML is replaced with this.

## targetURL
`string`

The target URL that you want to fetch.

## waitFor
`number` - **OPTIONAL**

The number of milliseconds to wait for before scraping the HTML. This gives time for the Javascript to run on the page.

## transformExternalLinks
`boolean` - **OPTIONAL**

Whether to transform relative paths with the `baseURL` or not.

## puppeteerOptions
`PuppeteerOptions` - **OPTIONAL**

Additional parameters for Puppeteer.

# License
MIT
