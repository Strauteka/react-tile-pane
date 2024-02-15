import React, { memo, useContext, useMemo } from 'react'
import { usePaneStyle } from './hook'
import { TilePaneProviderContext } from 'components/tilePane/view/Provider/config/PaneProvider'

import { TilePaneWithRect } from 'components/tilePane/util'

export interface TilePaneProps{
  pane: TilePaneWithRect
}

const TilePaneInner: React.FC<TilePaneProps> = ({
  pane
}) => {
  const TilePaneProviderConfig = useContext(TilePaneProviderContext)
  const styled = usePaneStyle(pane)
  return useMemo(
    () => (
      <TilePaneProviderConfig.paneProvider
        pane={pane}
        styled={styled}
      />
    ),
    [styled, pane]
  )
}

export const TilePaneStyled = memo(TilePaneInner)
