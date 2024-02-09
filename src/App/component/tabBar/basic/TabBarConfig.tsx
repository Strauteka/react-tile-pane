import {
  TabBarPropsWithAction,
  TabsBarConfig,
  TabsBarPosition,
} from 'components'
import { CustomTabBarProps, TabBar } from './TabBar'
import { stretchBarThickness, thickness } from './styles'

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
    [P in keyof T]-?: T[P];
};

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
        // console.log('CALLRENDER',leaf, tabs, onTab, action)
        return (
          <TabBar
            leaf={leaf}
            onTab={onTab}
            tabs={tabs}
            moving={tabs.filter(entry => {
              return !leaf.children.find(tabLeft => tabLeft===entry)
            })}
            action={action}
            {...tabProps}
          ></TabBar>
        )
      },
      thickness,
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
