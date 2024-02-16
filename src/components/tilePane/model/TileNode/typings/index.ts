import { TileBranch } from '..'
import { PaneName } from '../../..'

export type TileNodeID = string

export interface TileCharacteristic {
  grow?: number
  movable?: {
    center?: boolean
    right?: boolean
    left?: boolean
    top?: boolean
    bottom?: boolean
  }
}

export interface TileBranchSubstance {
  id?: TileNodeID
  isRow?: boolean | undefined
  children: (TileBranchSubstance | TileLeafSubstance)[]
  grow?: number | undefined
  characteristic?: TileCharacteristic
}

export interface TileLeafSubstance {
  id?: TileNodeID
  onTab?: number
  children: PaneName[]
  grow?: number | undefined
  characteristic?: TileCharacteristic
}

export interface TileNodeRect {
  top: number
  left: number
  width: number
  height: number
}

export type TileNodeConstructor = [
  id: TileNodeID | undefined,
  parent: TileBranch | null,
  grow: number | undefined,
  rect: TileNodeRect | undefined,
  characteristic: TileCharacteristic
]
