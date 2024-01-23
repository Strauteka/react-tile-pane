import { CustomSection } from 'App/section/componentSection/CustomSection'
import { functionalTest } from 'App/section/functionalSection/functionalSection'
import {
  pineapple,
  lemon,
  grape,
} from 'App/section/reactNodeSection/ReactNodeSection'
import { Constr, TilePane, TileProviderContext } from 'components'

export interface ContextProps<T> {
  context: TileProviderContext
  instruction: unknown
  sectionProps: T
}

export const section: {
  [name: string]:
    | React.ReactNode
    | Constr<React.Component<ContextProps<any>, any>>
    | React.FC<ContextProps<any>>
} = {
  customSection: CustomSection,
  functionalSection: functionalTest,
  pineapple: pineapple,
  lemon: lemon,
  grape: grape,
}

export function createTilePanes<Keys extends string = string>(section: {
  [K in Keys]:
    | React.ReactNode
    | Constr<React.Component<ContextProps<any>, any>>
    | React.FC<ContextProps<any>>
}): TilePane[] {
  const tilePanes: TilePane[] = Object.entries(section)
    .map((entry) => ({ key: entry[0], value: entry[1] as any }))
    .map((entry) => {
      return { name: entry.key, child: entry.value }
    })

  return tilePanes
}
