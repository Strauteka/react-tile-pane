import React, { memo, useContext, useMemo } from 'react'
import {
  Constr,
  PaneContext,
  TilePaneWithRect,
  TileProviderContext,
  unfold,
} from '../../../../../..'
import { useChild, useStyle } from './hook'
import { Bearer, unfoldBearer } from './Bearer'

export interface TilePaneProps<T> {
  context: TileProviderContext
  props: T
  pane: TilePaneWithRect
  selection: {
    selection: string
    setSelection: (pane: string) => void
  }
}

const TilePaneInner: React.FC<TilePaneProps<unknown>> = ({
  pane,
  context,
  props,
  selection,
}) => {
  const { style, className } = useContext(PaneContext)
  const bearer = unfoldBearer(pane.name)
  const child = useChild(bearer.paneName)
  const styled = useStyle(pane.rect)
  return useMemo(
    () => (
      <TileWrapper
        hooks={{
          className: className,
          style: style,
          styled: styled,
          content: child,
        }}
        tilePaneProps={{
          pane: pane,
          context: context,
          props: props,
          selection: selection,
        }}
        id={pane.name}
        bearer={bearer}
      />
    ),
    [child, className, style, styled, context, props]
  )
}

export interface TileWrapperProps<T> {
  tilePaneProps: TilePaneProps<T>
  hooks: {
    className?: string
    style?: React.CSSProperties
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
        className={this.props.hooks.className}
        style={{
          ...this.props.hooks.style,
          ...this.props.hooks.styled,
          ...(this.props.tilePaneProps.selection.selection === this.props.id
            ? { border: '2px solid #ff0000' }
            : { border: '2px solid #000000' }),
        }}
        onClick={(event) => {
          // const { target: { value } } = event;
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

export const TilePane = memo(TilePaneInner)
