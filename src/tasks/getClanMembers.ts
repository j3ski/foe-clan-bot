import { Page, Response } from 'puppeteer'
import { getServiceMethodResponse } from '../utils'
import { Player } from '../types'

const getClanData = getServiceMethodResponse('ClanService', 'getOwnClanData')

export const getClanMembers = async (page: Page): Promise<Player[]> => {
  let res: (value: Player[]) => void
  const returnValue = new Promise<Player[]>(resolve => { res = resolve })
  const handleRequest = async (ev: Response) => {
    if (/game\/json/.test(ev.url())) {
      const data = await ev.json()
      res(getClanData(data as any).members)
      page.removeListener('response', handleRequest)
    }
  }
  page.addListener('response', handleRequest)
  await page.keyboard.press('g')

  return returnValue
}
