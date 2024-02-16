import {
  TileContainer,
  TileContainerProps,
  TileLeavesContext,
} from 'components'
import { useContext } from 'react'

export const AppContainer: React.FC<TileContainerProps> = (props) => {
  const leaves = useContext(TileLeavesContext)
  return leaves.length === 0 ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
      }}
    >
      YOUR-DEFAULT-VIEW
    </div>
  ) : (
    <TileContainer {...props} />
  )
}
