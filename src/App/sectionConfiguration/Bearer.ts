import { PaneName } from 'components'
import { Buffer } from 'buffer'

function makeId(length: number) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export interface Bearer<T> {
  paneName: PaneName
  key: string
  props?: T
}

export const makeBearer = <T>(paneName: PaneName, props?: T): Bearer<T> => {
  return {
    paneName: paneName,
    key: makeId(8),
    props: props,
  }
}

const toBase64 = (str: string): string => {
  return Buffer.from(str, 'binary').toString('base64')
}

const fromBase64 = (str: string): string => {
  return Buffer.from(str, 'base64').toString('binary')
}

export const makeBearerString = <T>(paneName: PaneName, props?: T): string => {
  return toBase64(JSON.stringify(makeBearer(paneName, props)))
}

export const foldBearer = <T>(bearer: Bearer<T>): string => {
  return toBase64(JSON.stringify(bearer))
}

export const unfoldBearer = <T>(bearer: string): Bearer<T> => {
  try {
    return JSON.parse(fromBase64(bearer))
  } catch (error) {
    return makeBearer(bearer, undefined as any)
  }
}
