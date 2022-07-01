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
  const webpage = await fetch({
    targetURL: 'https://www.npmjs.com',
    type: 'DOCUMENT',
    puppeteerOptions: {
      baseURL: 'https://www.npmjs.com/package/solid-custom-scrollbars'
    }
  })
  res.send(webpage)
})

app.get('/image', async (req, res) => {
  const image = (await fetch({
    targetURL: 'https://picsum.photos/1000',
    type: 'BLOB'
  })).data
  res.send(image)
})

app.listen(3000)
```

## Usage with Heroku
If you're using this package with [Heroku](https://www.heroku.com), be sure to add [`puppeteer-heroku-buildpack`](https://github.com/jontewks/puppeteer-heroku-buildpack) as your app's buildpack.

## Usage with AWS
If you want to use this package with [AWS](https://aws.amazon.com), try out the sister package [`aws-proxy-fetch`](https://www.npmjs.com/package/aws-proxy-fetch), or check out this [guide](https://oxylabs.io/blog/puppeteer-on-aws-lambda).

# API

## targetURL
`string`

The target URL that you want to fetch.

## type
`FetchType = 'DOCUMENT' | 'BLOB'`

The type of content you are fetching.

## axiosOptions
`AxiosOptions` - **OPTIONAL**

Options for Axios, only used when `type` is `BLOB`.

### config
`AxiosRequestConfig<any>` - **OPTIONAL**

### headers
`AxiosRequestHeaders` - **OPTIONAL**

## puppeteerOptions
`PuppeteerOptions` - **OPTIONAL**

### baseURL
`string`

The base URL with the pattern `protocol://domain.tld`. All relative paths in the fetched HTML is replaced with this.

### waitFor
`number` - **OPTIONAL**

The number of milliseconds to wait for before scraping the HTML. This gives time for the Javascript to run on the page. Defaults to `5000`.

### transformExternalLinks
`boolean` - **OPTIONAL**

Whether to transform relative paths with the `baseURL` or not. Defaults to `true`.

### launchOptions
`Partial<PuppeteerOptions>` - **OPTIONAL**

Launch options for Puppeteer.

### launchArguments
`string[]` - **OPTIONAL**

Launch arguments for Puppeteer.

# License
MIT
