import React, { memo, useContext, useMemo } from 'react'
import {
  PaneContext,
  TilePaneWithRect,
  TileProviderContext,
} from '../../../../../..'
import { useChild, useStyle } from './hook'

export interface TilePaneProps {
  tileProviderContext: TileProviderContext
  pane: TilePaneWithRect
}

const TilePaneInner: React.FC<TilePaneProps> = ({
  pane,
  tileProviderContext,
}) => {
  const { style, className } = useContext(PaneContext)
  const child = useChild(pane.name)
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
        tilePaneProps={{ pane: pane, tileProviderContext: tileProviderContext }}
      />
    ),
    [child, className, style, styled]
  )
}

export interface TileWrapperProps {
  tilePaneProps: TilePaneProps
  hooks: {
    className?: string
    style?: React.CSSProperties
    styled?: React.CSSProperties
    content: React.ReactNode | React.Component<unknown, unknown, any>
  }
}

export class TileWrapper extends React.Component<TileWrapperProps, {}> {
  constructor(props: TileWrapperProps) {
    super(props)
  }
  shouldComponentUpdate(nextProps: TileWrapperProps, nextState: {}) {
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
        {React.isValidElement(this.props.hooks.content)
          ? this.props.hooks.content
          : React.createElement(this.props.hooks.content as any, {
              tileProviderContext: this.props.tilePaneProps.tileProviderContext,
            })}
      </div>
    )
  }
}

export const TilePane = memo(TilePaneInner)
