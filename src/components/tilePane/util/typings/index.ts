import React from 'react'
import { TileLeaf, TileNodeRect } from '../..'

export type PaneName = string

export type MovingTab = {
  name: PaneName
  leaf?: TileLeaf
  tabIndex: number
  leafIndex: number
}

export type TilePane = {
  name: PaneName
  idx: number
  child: React.ReactNode | React.Component<unknown, unknown> | React.FC<unknown>
}

export interface TilePaneWithRect {
  name: PaneName
  rect: TileNodeRect | null
}
