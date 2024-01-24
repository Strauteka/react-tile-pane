import { MovePane } from '../view/Provider/hook/useMove'

export * from './TileNode'
export * from './StretchBar'

export type TileProviderContext = {
  context?: TileProviderContext
  moveRef?:  MovePane
}
