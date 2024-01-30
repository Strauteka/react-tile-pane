import { TileProviderContext } from 'components/tilePane/model'
import { Constr, TilePaneWithRect } from 'components/tilePane/util'
import {
  Bearer,
  unfoldBearer,
} from 'components/tilePane/view/Container/components/TilePanes/components/TilePane/Bearer'
import {
  useChild
} from 'components/tilePane/view/Container/components/TilePanes/components/TilePane/hook'
import { createContext } from 'react'
import React from 'react'

export interface TilePaneProps<T> {
  context: TileProviderContext
  props: T
  pane: TilePaneWithRect
  selection: {
    selection: string
    setSelection: (pane: string) => void
  }
}

export type TilePaneProviderProps = {
  pane: TilePaneWithRect
  styled: React.CSSProperties
  context: TileProviderContext
  selection: {
    selection: string
    setSelection: (pane: string) => void
  }
}

export const defaultTilePaneProvider: React.FC<TilePaneProviderProps> = (
  props: TilePaneProviderProps
) => {
  const bearer = unfoldBearer(props.pane.name)
  const child = useChild(bearer.paneName)
  return (
    <TileWrapper
      hooks={{
        styled: props.styled,
        content: child,
      }}
      tilePaneProps={{
        pane: props.pane,
        context: props.context,
        props: props,
        selection: props.selection,
      }}
      id={props.pane.name}
      bearer={bearer}
    />
  )
}

export interface TileWrapperProps<T> {
  tilePaneProps: TilePaneProps<T>
  hooks: {
    styled?: React.CSSProperties
    content: React.ReactNode | Constr<React.Component<any, any>> | React.FC<any>
  }
  id: string
  bearer: Bearer<unknown>
}

export class TileWrapper extends React.Component<
  TileWrapperProps<unknown>,
  {}
> {
  constructor(props: TileWrapperProps<unknown>) {
    super(props)
  }
  shouldComponentUpdate(nextProps: TileWrapperProps<unknown>, nextState: {}) {
    const tabsMoving =
      (nextProps.tilePaneProps.pane.rect != null) !==
      (this.props.tilePaneProps.pane.rect != null)
    return tabsMoving || nextProps.tilePaneProps.pane.rect != null
  }

  render = () => {
    return (
      <div
        style={{
          ...this.props.hooks.styled,
          ...(this.props.tilePaneProps.selection.selection === this.props.id
            ? { border: '3px solid #ff0000' }
            : { border: '3px solid #000000' }),
        }}
        onClick={(event) => {
          // const { target: { value } } = event;
          console.log('missfire for ', this.props.id)

          this.props.tilePaneProps.selection.setSelection(this.props.id)
        }}
      >
        {React.isValidElement(this.props.hooks.content) ? (
          this.props.hooks.content
        ) : this.props.hooks.content != null ? (
          React.createElement(this.props.hooks.content as any, {
            context: this.props.tilePaneProps.context,
            props: this.props.tilePaneProps.props,
            childProps: this.props.bearer,
          })
        ) : (
          <></>
        )}
      </div>
    )
  }
}

export type TilePaneProviderConfig = {
  paneProvider: React.FC<TilePaneProviderProps>
}

export const TilePaneProviderContext = createContext<TilePaneProviderConfig>({
  paneProvider: defaultTilePaneProvider,
})
