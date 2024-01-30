import React, { memo, useContext, useMemo } from 'react'
import { ContainerRefContext, MovingTabsContext, useMovePane } from '..'
import { StretchBars, TabsBars, TilePanes } from './components'
import { TileProviderContext } from 'components/tilePane/model'

export interface TileContainerProps {
  context?: TileProviderContext
  style?: React.CSSProperties
  className?: string
}

const TileContainerInner: React.FC<TileContainerProps> = ({
  context,
  style = { width: '100%', height: '100%' },
  className,
}) => {

  const finalContext: TileProviderContext = {
    context: context,
  }
  const targetRef = useContext(ContainerRefContext)
  const movingTabs = useContext(MovingTabsContext)
  return useMemo(() => {
    return (
      <div
        ref={targetRef}
        className={className}
        style={{
          ...style,
          position: 'relative',
          userSelect: movingTabs.length ? 'none' : 'auto',
        }}
      >
        <TabsBars />
        <TilePanes context={finalContext}/>
        <StretchBars />
      </div>
    )
  }, [className, movingTabs.length, style, targetRef, context])
}

export * from './utils'
export * from './components'
export const TileContainer = memo(TileContainerInner)
