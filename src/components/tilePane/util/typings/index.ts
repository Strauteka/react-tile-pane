import React from 'react'
import { TileLeaf, TileNodeRect } from '../..'
export interface Constr<T> {
  new (...args: any[]): T;
}

export type PaneName = string

export type MovingTab = {
  name: PaneName
  leaf?: TileLeaf
  tabIndex: number
  leafIndex: number
}

export type TilePane = {
  name: PaneName
  child: React.ReactNode | Constr<React.Component<any, any>> |  React.FC<any>
}

export interface TilePaneWithRect {
  name: PaneName
  rect: TileNodeRect | null
}
