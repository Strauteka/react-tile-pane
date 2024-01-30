import React, { memo, useContext, useMemo } from 'react'
import { PaneContext } from '../../../../../..'
import { useChild, useStyle } from './hook'
import { Bearer, unfoldBearer } from './Bearer'
import {
  TilePaneProps,
  TilePaneProviderContext,
} from 'components/tilePane/view/Provider/config/PaneProvider'

const TilePaneInner: React.FC<TilePaneProps<unknown>> = ({
  pane,
  context,
  props,
  selection,
}) => {
  const TilePaneProviderConfig = useContext(TilePaneProviderContext)
  const styled = useStyle(pane.rect)
  return useMemo(
    () => (
      <TilePaneProviderConfig.paneProvider
        context={context}
        pane={pane}
        styled={styled}
        selection={selection}
      />
    ),
    [styled, context, props]
  )
}

export const TilePane = memo(TilePaneInner)
