import React, { memo, useMemo, useState } from 'react'
import { usePanes } from './hook'
import { TilePane } from './components'
import { TileProviderContext } from 'components/tilePane/model'

const TilePanesInner: React.FC<{
  context: TileProviderContext
}> = (props: { context: TileProviderContext }) => {

  const panes = usePanes()
  return useMemo(
    () => (
      <>
        {panes.map((pane) => {
          return (
            <TilePane
              context={props.context}
              pane={pane}
              key={pane.name}
            />
          )
        })}
      </>
    ),
    [panes, props]
  )
}

export const TilePanes = memo(TilePanesInner)
