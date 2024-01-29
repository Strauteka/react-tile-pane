import {
  StretchBarConfig,
  TabsBarConfig,
} from 'components'


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
  thickness: 0,
  stretchBarThickness: 4,
  borderThickness: 4,
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
