import { TileLeaf, TileNodeRect } from '../..'

export type PaneName = string

export type MovingTab = {
  name: PaneName
  leaf?: TileLeaf
  tabIndex: number
  leafIndex: number
}

export interface TilePaneWithRect {
  name: PaneName
  rect: TileNodeRect | null
}
