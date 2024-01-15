import { CSSProperties, createContext, ReactNode } from 'react'
import { PaneWithPreBox } from '../../..'

export type PreBoxTarget = 'leaf' | 'branch' | 'tab' | null

export type PreBoxConfig = {
  style?: ((paneWithPreBox: PaneWithPreBox) => CSSProperties) | CSSProperties
  className?: ((paneWithPreBox: PaneWithPreBox) => string) | string
  child?: ((paneWithPreBox: PaneWithPreBox) => ReactNode) | ReactNode
  /** **millisecond**, Control PreBox calculation frequency */
  throttle?: number
}

export const defaultPreBox: PreBoxConfig = {
  throttle: 66,
  style: ({ branch, leaf, tab }) => {
    if (branch)
      return {
        background: '#00000088',
        transition: 'cubic-bezier(0.5, 0.1, 0.165, 1) 233ms',
      }
    if (leaf)
      return {
        background: '#00000088',
        transition: 'cubic-bezier(0.5, 0.1, 0.165, 1) 233ms',
      }
    if (tab)
      return {
        background: '#00000088',
        transition: 'cubic-bezier(0.5, 0.1, 0.165, 1) 233ms',
      }
    return {
      background: '#ffffff00',
      transition: 'cubic-bezier(0.5, 0.1, 0.165, 1) 233ms',
    }
  },
}

export const PreBoxConfigContext = createContext<PreBoxConfig>(defaultPreBox)
