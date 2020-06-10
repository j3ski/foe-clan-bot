import { Page, ElementHandle } from 'puppeteer'

const findWorldLink = async (links: ElementHandle<Element>[], world: string): Promise<ElementHandle<Element> | null> => {
  for (const link of links) {
    const innerText = await link.getProperty('innerText')
    const value = await innerText.jsonValue()
    if (value === world) {
      return link
    }
  }
  return null
}

export const login = async (page: Page, username: string, password: string, world: string) => {
  await page.goto('https://pl.forgeofempires.com/')
  await page.type('#login_userid', username)
  await page.type('#login_password', password)
  await page.click('#login_Login')
  await page.waitForNavigation()
  await page.click('#play_now_button')
  await page.waitForSelector('.world_select_button')
  const links = await page.$$('.world_select_button')
  const link = await findWorldLink(links, world)
  if (!link) {
    throw new Error(`No ${world} found`)
  }
  await link.click()
  await page.waitForNavigation()
}
