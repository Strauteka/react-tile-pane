import React, { createContext, memo, useMemo } from 'react'
import { TabBarAction, TabBarMoreProps, TabBarProps } from '../../..'
import { DraggableTitle, useMovingChecker } from '../../../DraggableTitle'
import { TilePaneWithRect } from 'components/tilePane/util/typings'

export type TabBarPropsWithAction = TabBarProps & { action: TabBarAction }

const TabBarInner: React.FC<TabBarPropsWithAction> = ({
  tabs,
  onTab,
  action,
}) => {
  const checkTabMoving = useMovingChecker()

  return useMemo(
    () => (
      <div className="react-tile-pane-tabBar">
        {tabs.map((tab, i) => (
          <DraggableTitle
            className={(isMoving) =>
              isMoving ? 'react-tile-pane-tabMoving' : 'react-tile-pane-tab'
            }
            name={tab}
            key={tab}
          >
            <div
              className={
                i === onTab
                  ? 'react-tile-pane-tabInner '
                  : 'react-tile-pane-tabInnerOff'
              }
              onClick={() => action.switchTab(i)}
            >
              <div className="react-tile-pane-tabTitle">{tab}</div>
              {!checkTabMoving(tabs[i]) && (
                <div
                  className="react-tile-pane-off"
                  onClick={() => action.closeTab(i)}
                >
                  ×
                </div>
              )}
            </div>
          </DraggableTitle>
        ))}
      </div>
    ),
    [action, checkTabMoving, onTab, tabs]
  )
}
export type TabsBarPosition = 'left' | 'right' | 'top' | 'bottom'
/**How TabsBar look like?*/
export type TabsBarConfig = {
  /**To customize how the TabsBar is rendered*/
  render: React.FC<TabBarPropsWithAction>
  /**Accepts a CSS length attribute, which defaults to px if number is passed in
   * @example 20, '20px', '2vw'
   */
  thickness: number
  thicknessOverride?: (entity: TilePaneWithRect | TabBarMoreProps | null) => number | undefined
  stretchBarThickness: number
  /**Where to position the TabsBar in the pane */
  position: TabsBarPosition
  /**How preBox in TabsBar look like?*/
  preBox?: {
    isRow?: boolean
    isReverse?: boolean
  }
}

export const DefaultTabBar = memo(TabBarInner)
export const defaultTabsBarConfig: TabsBarConfig = {
  render: DefaultTabBar,
  thickness: 2.5,
  stretchBarThickness: 0.125,
  position: 'top',
  preBox: {
    isRow: true,
    isReverse: false,
  },
}
export const TabsBarContext = createContext<TabsBarConfig>(defaultTabsBarConfig)
