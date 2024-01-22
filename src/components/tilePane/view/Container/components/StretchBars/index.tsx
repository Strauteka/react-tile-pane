import React, { memo, useContext, useMemo } from 'react'
import { StretchBarsContext } from '../../..'
import { StretchBar } from './StretchBar'

const StretchBarsInner: React.FC = () => {
  const bars = useContext(StretchBarsContext)
  return useMemo(
    () => (
      <>
        {bars.map((bar, key) => {
          return <StretchBar bar={bar} key={key + bar.nextPane.id} />
        })}
      </>
    ),
    [bars]
  )
}

export const StretchBars = memo(StretchBarsInner)
