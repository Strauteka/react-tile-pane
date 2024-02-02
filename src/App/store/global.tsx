import { MovePane, useMovePane } from 'components'

export const context: { [name: string]: { movePane: MovePane } } = {}

export const contextName = {
  main: 'main',
}

export function ContextStore(props: { name: string }) {
  context[props.name] = { ...context[props.name], movePane: useMovePane() }
  return <></>
}
