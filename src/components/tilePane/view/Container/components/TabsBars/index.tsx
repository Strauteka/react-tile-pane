import React, { memo, useMemo } from 'react'
import { TabsBar } from './components'
import { useTabs } from './hook'

const TabsBarsInner: React.FC = () => {
  const tabBars = useTabs()
  return useMemo(
    () => {
      return (
      <>
        {tabBars.map((tabBar, key) => (
          <TabsBar key={key + tabBar.leaf.id} {...tabBar} />
        ))}
      </>
    )},
    [tabBars]
  )
}

export const TabsBars = memo(TabsBarsInner)
export * from './components'
