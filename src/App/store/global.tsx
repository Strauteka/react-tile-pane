import { useMovePane } from 'components'

export const context: { [name: string]: any } = {}

export const conextName = {
  main: 'main',
}

export function ContextStore(props: { name: string }) {
    console.log('setting context', props.name)
  context[props.name] = useMovePane();
  return <></>
}
