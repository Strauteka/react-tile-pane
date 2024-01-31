import {
  StretchBarConfig,
  TabsBarConfig,
} from 'components'
import React, { useContext } from 'react'
import { TabBar } from './TabBar'
import { AppSelectionContext } from 'App/context/AppStateContext'

export * from './styles'

export const tabBarConfig: (
  icons: Record<string | number, string>,
  defaultIcon: string
) => TabsBarConfig = (icons, defaultIcon) => ({
  render: ({ leaf, tabs, onTab, action }) => {
    return (
      <TabBar
        leaf={leaf}
        onTab={onTab}
        tabs={tabs}
        action={action}
      ></TabBar>
    )
    // return (
    //   <>
    //     <div style={styles.tabBar}>
    //       <div style={styles.tabAlign}>{tabs.map(tabBar)}</div>
    //       {onTab !== -1 && (
    //         <div
    //           onClick={() => action.closeTab(onTab)}
    //           style={styles.closeButton}
    //         >
    //           ×
    //         </div>
    //       )}
    //     </div>
    //   </>
    // )
    // function tabBar(tab: PaneName, i: number) {
    //   const bearer = unfoldBearer(tab)
    //   return (
    //     <DraggableTitle
    //       style={{
    //         ...(i === onTab ? styles.tabTitleOn : styles.tabTitle),
    //         color: '#ffffff',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         minWidth: '40px',
    //       }}
    //       name={tab}
    //       key={tab}
    //       onClick={() => {
    //         console.log('Tab switching from =>to', tabs[onTab], onTab, tab, i)
    //         action.switchTab(i)
    //       }}
    //     >
    //       <div style={{ ...flex.center, ...size.full }}>
    //         {icons[bearer.paneName] ?? defaultIcon}
    //       </div>
    //       <div
    //         style={{
    //           background: i === onTab ? color.primary : color.secondaryL,
    //           width: '100%',
    //           height: 6,
    //         }}
    //       />
    //     </DraggableTitle>
    //   )
    // }
  },
  thickness: 2.5,
  stretchBarThickness: 0.25,
  borderThickness: 0.25,
  position: 'top',
  preBox: {
    isRow: true,
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
