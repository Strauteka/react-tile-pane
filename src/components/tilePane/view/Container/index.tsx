import React, { memo, useContext, useMemo } from 'react'
import { ContainerRefContext, MovingTabsContext, useMovePane } from '..'
import { StretchBars, TabsBars, TilePanes } from './components'
import { TileProviderContext } from 'components/tilePane/model'

export interface TileContainerProps<T> {
  context?: TileProviderContext
  props?: T
  style?: React.CSSProperties
  className?: string
}

const TileContainerInner: React.FC<TileContainerProps<unknown>> = ({
  context,
  props,
  style = { width: '100%', height: '100%' },
  className,
}) => {
  console.log('flushing custom props', props)
  const finalContext: TileProviderContext = {
    context: context,
    moveRef: useMovePane()
    ,
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
        <TilePanes context={finalContext} props = {props} />
        <StretchBars />
      </div>
    )
  }, [className, movingTabs.length, style, targetRef, context, props])
}

export * from './utils'
export * from './components'
export const TileContainer = memo(TileContainerInner)
