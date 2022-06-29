// Packages:
import puppeteer, {
  LaunchOptions,
  BrowserLaunchArgumentOptions,
  BrowserConnectOptions,
  Product
} from 'puppeteer'
import cheerio from 'cheerio'
import { convertAnchorHrefs } from './utils/convertAnchorHrefs'
import { convertImageSrcs } from './utils/convertImageSrcs'


// Typescript:
export type PuppeteerOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
  product?: Product
  extraPrefsFirefox: Record<string, unknown>
}


// Functions:
const fetch = async ({
  baseURL,
  targetURL,
  waitFor = 5000,
  transformExternalLinks = true,
  puppeteerOptions
}: {
  baseURL: string
  targetURL: string
  waitFor?: number
  transformExternalLinks?: boolean
  puppeteerOptions?: PuppeteerOptions
}) => {
  try {
    let pageContent = ''
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ],
      ...puppeteerOptions
    })
    const page = await browser.newPage()
    await page.goto(targetURL)
    page.waitForTimeout(waitFor)
    pageContent = await page.content()
    if (transformExternalLinks) {
      const $ = cheerio.load(pageContent)
      convertAnchorHrefs({ $, baseURL })
      convertImageSrcs({ $, baseURL })
      pageContent = $.html()
    }
    browser.close()
    return pageContent
  } catch(e) {
    console.error('proxy-fetch encountered an error')
    throw new Error(e as any)
  }
}


// Exports:
export default fetch
