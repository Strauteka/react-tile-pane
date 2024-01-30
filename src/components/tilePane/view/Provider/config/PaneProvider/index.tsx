import { TileProviderContext } from 'components/tilePane/model'
import { TilePaneWithRect } from 'components/tilePane/util'
import { createContext } from 'react'
import React from 'react'


export type TilePaneProviderProps = {
  pane: TilePaneWithRect
  styled: React.CSSProperties
  context: TileProviderContext
  paneProps?: {}
}

export const defaultTilePaneProvider: React.FC<TilePaneProviderProps> = (
  props: TilePaneProviderProps
) => {
  return (
    <div style={props.styled}>{props.pane.name}</div>
  )
}

export type TilePaneProviderConfig = {
  paneProvider: React.FC<TilePaneProviderProps>
}

export const TilePaneProviderContext = createContext<TilePaneProviderConfig>({
  paneProvider: defaultTilePaneProvider,
})
