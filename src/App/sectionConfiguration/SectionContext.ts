import { TilePaneWithRect } from 'components'
export interface Constr<T> {
  new (...args: any[]): T
}

export interface SectionContext<T> {
  pane: TilePaneWithRect
  parent: {}
}
