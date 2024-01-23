import { CustomSection } from 'App/section/componentSection/CustomSection'
import { functionalTest } from 'App/section/functionalSection/functionalSection'
import {
  pineapple,
  lemon,
  grape,
} from 'App/section/reactNodeSection/ReactNodeSection'
import { TileProviderContext } from 'components'

export interface Constr<T> {
  new (...args: any[]): T
}

export interface ContextProps<T> {
  tileProviderContext: TileProviderContext
  sectionProps: T
}

export interface SectionConfiguration<T> {
  section:
    | React.ReactNode
    | Constr<React.Component<ContextProps<T>, any>>
    | React.FC<ContextProps<T>>
  tabTitle: string
  initialProps: T
}

export const configuration 
  : { [name: string]: SectionConfiguration<unknown> }
  = {
    customSection: {
      section: CustomSection,
      tabTitle: 'Custom section',
      initialProps: {},
    },
    functionalSection: {
      section: functionalTest,
      tabTitle: '🥝',
      initialProps: {},
    },
    pineapple: {
      section: pineapple,
      tabTitle: '🍍',
      initialProps: {},
    },
    lemon: {
      section: lemon,
      tabTitle: '🍋',
      initialProps: {},
    },
    grape: {
      section: grape,
      tabTitle: '🍇',
      initialProps: {},
    },
  }
