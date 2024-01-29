import React, { memo, useMemo, useState } from 'react'
import { usePanes } from './hook'
import { TilePane } from './components'
import { TileProviderContext } from 'components/tilePane/model'

const TilePanesInner: React.FC<{
  context: TileProviderContext
  props: unknown
}> = (props: { context: TileProviderContext; props: unknown }) => {
  const [selection, setSelection] = useState('')
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
              props={props.props}
              selection={{ selection, setSelection }}
            />
          )
        })}
      </>
    ),
    [panes, props, selection]
  )
}

export const TilePanes = memo(TilePanesInner)
