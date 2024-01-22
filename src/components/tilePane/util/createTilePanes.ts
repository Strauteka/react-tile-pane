import React, { ReactNode } from 'react'
import { TilePane } from '..'

export function createTilePanes<
  Keys extends string = string
>(obj: {
  [K in Keys]: ReactNode | any
}): [TilePane[], { [name: string]: string }] {
  const map = {} as any
  const list: TilePane[] = []
  Object.keys(obj).forEach((key) => {
    map[key] = key
    list.push({
      name: key,
      child: obj[key as Keys],
    })
  })
  return [list, map as { [K in Keys]: K }]
}
