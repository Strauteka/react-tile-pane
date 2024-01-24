import React, { memo, useContext, useMemo } from 'react'
import {
  Constr,
  PaneContext,
  TilePaneWithRect,
  TileProviderContext,
  unfold,
} from '../../../../../..'
import { useChild, useStyle } from './hook'
import { unfoldBearer } from './Bearer'

export interface TilePaneProps<T> {
  context: TileProviderContext
  props: T
  pane: TilePaneWithRect,
}

const TilePaneInner: React.FC<TilePaneProps<unknown>> = ({
  pane,
  context,
  props
}) => {
  const { style, className } = useContext(PaneContext)
  const bearer = unfoldBearer(pane.name);
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
        tilePaneProps={{ pane: pane, context: context, props: props}}
        childProps={bearer.props}
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
    content: React.ReactNode | Constr<React.Component<any, any>> |  React.FC<any>
  }
  childProps: T
}

export class TileWrapper extends React.Component<TileWrapperProps<unknown>, {}> {
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
        style={{ ...this.props.hooks.style, ...this.props.hooks.styled }}
      >
        {React.isValidElement(this.props.hooks.content) ? (
          this.props.hooks.content
        ) : this.props.hooks.content != null ? (
          React.createElement(this.props.hooks.content as any, {
            context: this.props.tilePaneProps.context,
            props: this.props.tilePaneProps.props,
            childProps: this.props.childProps
          })
        ) : (
          <></>
        )}
      </div>
    )
  }
}

export const TilePane = memo(TilePaneInner)
