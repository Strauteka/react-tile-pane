import { PaneName, StretchBarConfig, TabsBarConfig } from 'components'
import { color, flex, size, styles, thickness } from '../basic/styles'

export * from '../basic/styles'

export const tabBarConfig: (
  icons: Record<string | number, string>,
  defaultIcon: string
) => TabsBarConfig = (icons, defaultIcon) => ({
  render({ tabs, onTab, action }) {
    return (
      <>
        <div style={styles.tabBar}>
          <div style={styles.tabAlign}>{tabs.map(tabBar)}</div>
        </div>
      </>
    )
    function tabBar(tab: PaneName, i: number) {
      return (
        <div
          style={{
            ...(i === onTab ? styles.tabTitleOn : styles.tabTitle),
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
          }}
          key={tab}
          onClick={() => {
            console.log('Tab switching from =>to', tabs[onTab], onTab, tab, i)
            action.switchTab(i)
          }}
        >
          <div style={{ ...flex.center, ...size.full }}>
            {icons[tab] ?? defaultIcon}
          </div>
          <div
            style={{
              background: i === onTab ? color.primary : color.secondaryL,
              width: '100%',
              height: 6,
            }}
          />
        </div>
      )
    }
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
