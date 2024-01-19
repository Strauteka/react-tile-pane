import React, { memo, useMemo } from 'react'
import { usePanes } from './hook'
import { TilePane } from './components'
import { TileProviderContext } from 'components/tilePane/model'

const TilePanesInner: React.FC<{
  tileProviderContext: TileProviderContext
}> = (props: { tileProviderContext: TileProviderContext }) => {
  const panes = usePanes()
  return useMemo(
    () => (
      <>
        {panes
        .map((pane) => {
          return (
            <TilePane
              tileProviderContext={props.tileProviderContext}
              pane={pane}
              key={pane.name}
            />
          )
        })}
      </>
    ),
    [panes]
  )
}

export const TilePanes = memo(TilePanesInner)
