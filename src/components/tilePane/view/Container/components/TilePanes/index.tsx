import React, { memo, useMemo } from 'react'
import { usePanes } from './hook'
import { TilePane } from './components'
import { TileProviderContext } from 'components/tilePane/model'

const TilePanesInner: React.FC<{
  context: TileProviderContext
  props: unknown
}> = (props: { context: TileProviderContext; props: unknown }) => {
  const panes = usePanes()
  return useMemo(
    () => (
      <>
        {panes.map((pane) => {
          return (
            <TilePane context={props.context} pane={pane} key={pane.name} props={props.props} />
          )
        })}
      </>
    ),
    [panes, props]
  )
}

export const TilePanes = memo(TilePanesInner)
