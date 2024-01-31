import React, { memo, useContext, useMemo } from 'react'
import { useStyle } from './hook'
import { TilePaneProviderContext } from 'components/tilePane/view/Provider/config/PaneProvider'

import { TilePaneWithRect } from 'components/tilePane/util'

export interface TilePaneProps{
  pane: TilePaneWithRect
}

const TilePaneInner: React.FC<TilePaneProps> = ({
  pane
}) => {
  const TilePaneProviderConfig = useContext(TilePaneProviderContext)
  const styled = useStyle(pane.rect)
  return useMemo(
    () => (
      <TilePaneProviderConfig.paneProvider
        pane={pane}
        styled={styled}
      />
    ),
    [styled]
  )
}

export const TilePane = memo(TilePaneInner)
