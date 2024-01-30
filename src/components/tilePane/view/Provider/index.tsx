import React, { memo, useMemo, useReducer } from 'react'
import useMeasure from 'react-use-measure'
import {
  PreBoxConfig,
  StretchBarConfig,
  TileBranchSubstance,
  TitleRectsProvider,
} from '../..'
import {
  ContainerRectContext,
  ContainerRefContext,
  MovingTabsContext,
  StretchBarsContext,
  TileBranchesContext,
  TileDispatchContext,
  TileLeavesContext,
  TileStoreReducer,
  initRootNode,
  TabsBarContext,
  tileStoreReducer,
  TabsBarConfig,
  defaultTabsBarConfig,
  StretchBarConfigContext,
  defaultStretchBar,
} from '.'
import {
  defaultPreBox,
  PreBoxConfigContext,
} from './config'
import { TilePaneProviderConfig, TilePaneProviderContext, defaultTilePaneProvider } from './config/PaneProvider'

export interface TileProviderProps {
  children?: React.ReactNode
  rootNode: TileBranchSubstance
  tilePaneProvider: TilePaneProviderConfig
  tabBar?: TabsBarConfig
  preBox?: PreBoxConfig
  stretchBar?: StretchBarConfig
}

const TileProviderInner: React.FC<TileProviderProps> = ({
  children,
  rootNode: rootNodeSub,
  tilePaneProvider = {paneProvider: defaultTilePaneProvider},
  tabBar = defaultTabsBarConfig,
  stretchBar = defaultStretchBar,
  preBox = defaultPreBox,
}: TileProviderProps) => {
  const [
    { branches, leaves, stretchBars, movingTabs },
    tileStoreDispatch,
  ] = useReducer<TileStoreReducer>(tileStoreReducer, {
    movingTabs: [],
    ...initRootNode(rootNodeSub),
  })

  const childrenMemo = useMemo(() => children, [children])
  const [targetRef, containerRect] = useMeasure({ scroll: true })
  return (
    <ContainerRefContext.Provider value={targetRef}>
      <PreBoxConfigContext.Provider value={preBox}>
        <TilePaneProviderContext.Provider value={tilePaneProvider}>
          <ContainerRectContext.Provider value={containerRect}>
            <TileBranchesContext.Provider value={branches}>
              <StretchBarConfigContext.Provider value={stretchBar}>
                <TileLeavesContext.Provider value={leaves}>
                    <StretchBarsContext.Provider value={stretchBars}>
                      <TileDispatchContext.Provider value={tileStoreDispatch}>
                        <MovingTabsContext.Provider value={movingTabs}>
                          <TabsBarContext.Provider value={tabBar}>
                            <TitleRectsProvider>
                              {childrenMemo}
                            </TitleRectsProvider>
                          </TabsBarContext.Provider>
                        </MovingTabsContext.Provider>
                      </TileDispatchContext.Provider>
                    </StretchBarsContext.Provider>
                </TileLeavesContext.Provider>
              </StretchBarConfigContext.Provider>
            </TileBranchesContext.Provider>
          </ContainerRectContext.Provider>
          </TilePaneProviderContext.Provider>
      </PreBoxConfigContext.Provider>
    </ContainerRefContext.Provider>
  )
}

export const TileProvider = memo(TileProviderInner)
export * from './typings'
export * from './controller'
export * from './data'
export * from './config'
export * from './hook'
