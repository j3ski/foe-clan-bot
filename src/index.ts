import puppeteer from 'puppeteer'
import { login } from './tasks/login'
import { delay, writeCSV, sortByName } from './utils'
import { getClanMembers } from './tasks/getClanMembers'
import { username, password, world } from '../user.json'
import path from 'path'

const main = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    console.log('Beginning login.')
    await login(page, username, password, world)
    console.log('Login done')

    console.log('Waiting 10 sec for the game to load')
    await delay(10000)
    console.log('Waiting done.')

    await page.mouse.click(0, 0)
    await delay(1000)
    console.log('Attempted to close dialog.')

    console.log('Attempting to fetch clan members')
    const members = await getClanMembers(page)

    writeCSV(
      path.resolve(__dirname, '..', 'members.csv'),
      sortByName(members).map(member => [member.name, member.score.toString()])
    )
  } finally {
    await browser.close()
  }
}

main()
