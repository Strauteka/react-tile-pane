import { useContext, useMemo } from 'react'
import { MovingTabsContext, TileLeavesContext } from '../../../../..'
import { TilePaneWithRect } from '../../../../../..'

export function usePanes() {
  const movingTabs = useContext(MovingTabsContext)
  const leaves = useContext(TileLeavesContext)

  const panes: TilePaneWithRect[] = useMemo(() => {
    const panes: TilePaneWithRect[] = movingTabs.map(({ name }) => ({
      name,
      rect: null,
    }))
    leaves.forEach((leaf) => {
      panes.push(
        ...leaf.children.map((name, i) => ({
          name,
          rect: leaf.onTab === i ? leaf.rect : null,
          leaf: leaf
        }))
      )
    })
    return panes
  }, [leaves, movingTabs])
  return panes
}
