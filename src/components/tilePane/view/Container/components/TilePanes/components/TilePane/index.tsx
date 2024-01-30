import React, { memo, useContext, useMemo } from 'react'
import { useStyle } from './hook'
import { TilePaneProviderContext } from 'components/tilePane/view/Provider/config/PaneProvider'
import { TileProviderContext } from 'components/tilePane/model'
import { TilePaneWithRect } from 'components/tilePane/util'

export interface TilePaneProps<T> {
  context: TileProviderContext
  pane: TilePaneWithRect
}

const TilePaneInner: React.FC<TilePaneProps<unknown>> = ({
  pane,
  context
}) => {
  const TilePaneProviderConfig = useContext(TilePaneProviderContext)
  const styled = useStyle(pane.rect)
  return useMemo(
    () => (
      <TilePaneProviderConfig.paneProvider
        context={context}
        pane={pane}
        styled={styled}
      />
    ),
    [styled, context]
  )
}

export const TilePane = memo(TilePaneInner)
