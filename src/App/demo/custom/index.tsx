import {
  StretchBarConfig,
  TabsBarConfig,
} from 'components'
import {  thickness } from './styles'

export * from './styles'

export const tabBarConfig: (
  icons: Record<string | number, string>,
  defaultIcon: string
) => TabsBarConfig = (icons, defaultIcon) => ({
  render({ tabs, onTab, action }) {
    return (
      <>
      </>
    )
  },
  thickness,
  position: 'top',
  preBox: {
    isRow: false,
    isReverse: false,
  },
})

export const stretchBar: StretchBarConfig = {
  className: 'left-stretch-bar',
  style: (isRow) => ({ cursor: isRow ? 'ew-resize' : 'ns-resize' }),
  position: 'previous',
}

export const theme = (
  icons: Record<string | number, string>,
  defaultIcon = '⭐'
) => ({
  tabBar: tabBarConfig(icons, defaultIcon),
  stretchBar,
})
