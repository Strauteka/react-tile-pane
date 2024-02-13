import {
  TabBarMoreProps,
  TabBarPropsWithAction,
  TabsBarConfig,
  TabsBarPosition,
  TilePaneWithRect,
} from 'components'
import { CustomTabBarProps, TabBar } from './TabBar'
import { stretchBarThickness, thickness } from './styles'
import { unfoldBearer } from 'App/sectionConfiguration/Bearer'

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

export type OverrideTabsBarConfig = {
  render: React.FC<TabBarPropsWithAction>
  thickness: number
  stretchBarThickness: number
  position: TabsBarPosition
  preBox?: {
    isRow?: boolean
    isReverse?: boolean
  }
}

export const tabBarBuilder = (
  tabProps: CustomTabBarProps,
  override?: Partial<TabsBarConfig>
): TabsBarConfig => {
  return {
    ...{
      render: ({ leaf, tabs, onTab, action }) => {
        const tab = tabs[onTab]
        const bearer = unfoldBearer(tab)

        if (bearer.paneName === 'editForm') {
          return <></>
        }

        return (
          <TabBar
            leaf={leaf}
            onTab={onTab}
            tabs={tabs}
            moving={tabs.filter((entry) => {
              return !leaf.children.find((tabLeft) => tabLeft === entry)
            })}
            action={action}
            {...tabProps}
          ></TabBar>
        )
      },
      thickness,
      thicknessOverride: (
        entity: TilePaneWithRect | TabBarMoreProps | null
      ) => {
        const notNullentity = entity ?? {}
        if (
          notNullentity.hasOwnProperty('name') &&
          notNullentity.hasOwnProperty('rect')
        ) {
          const tilePaneWithRect = notNullentity as TilePaneWithRect
          const bearer = unfoldBearer(tilePaneWithRect.name)
          if (bearer.paneName === 'editForm') {
            return 0
          }
        }

        if (
          notNullentity.hasOwnProperty('onTab') &&
          notNullentity.hasOwnProperty('tabs')
        ) {
          const tabBar = notNullentity as TabBarMoreProps
          const tab = tabBar.tabs[tabBar.onTab]
          const bearer = unfoldBearer(tab)

          if (bearer.paneName === 'editForm') {
            return 0
          }
        }
      },
      stretchBarThickness,
      position: 'top',
      preBox: {
        isRow: true,
        isReverse: false,
      },
    },
    ...override,
  }
}
