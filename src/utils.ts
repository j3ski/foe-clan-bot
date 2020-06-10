import { FoeResponse, Player } from './types'
import fs from 'fs'

export const delay = (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout))

export const getServiceMethodResponse = (service: string, method: string) =>
  (response: FoeResponse[]) =>
    response.find(r => r.requestClass === service && r.requestMethod === method)?.responseData

export const writeCSV = (filename: string, data: string[][]) => fs.writeFileSync(filename, data.map(parts => parts.join(', ')).join('\n'))

export const sortByName = (members: Player[]): Player[] => [...members].sort((m1, m2) => {
  const name1 = m1.name.toLowerCase()
  const name2 = m2.name.toLowerCase()

  if (name1 < name2) {
    return -1
  } else if (name1 > name2) {
    return 1
  }
  return 0
})
