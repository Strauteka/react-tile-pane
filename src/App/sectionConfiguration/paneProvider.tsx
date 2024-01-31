import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { section as sections } from './Section'
import { unfoldBearer } from './Bearer'
import React, { CSSProperties, useContext } from 'react'
import { AppSelectionContext } from 'App/context/AppStateContext'
import { named } from './named'
import { Constr } from './SectionContext'
import { TilePaneWithRect, TileProviderContext } from 'components'

export const PaneProvider: React.FC<TilePaneProviderProps> = (
  props: TilePaneProviderProps
) => {
  const bearer = unfoldBearer(props.pane.name)
  const sectionConfig = named[bearer.paneName] || { isSelection: false }
  const { selection, setSelection } = useContext(AppSelectionContext)
  const content = Object.entries(sections)
    .map((entry) => ({ key: entry[0], value: entry[1] }))
    .find((entry) => entry.key === bearer.paneName)?.value
  const border =
    selection === props.pane.name
      ? { border: '0.25em solid #ff0000' }
      : { border: '0.25em solid #000000' }
  return (
    <div
      style={{
        ...props.styled,
        ...(sectionConfig.isSelection ? border : {}),
        boxSizing: 'border-box',
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (sectionConfig.isSelection) {
          setSelection(props.pane.name)
        }
      }}
      {...props.paneProps}
    >
      <TileWrapper
        content={content}
        tilePaneProps={props.context}
        pane={props.pane}
      ></TileWrapper>
    </div>
  )
}

export interface TileWrapperProps<T> {
  tilePaneProps: TileProviderContext
  pane: TilePaneWithRect
  content: React.ReactNode | Constr<React.Component<any, any>> | React.FC<any>
}
export class TileWrapper extends React.Component<
  TileWrapperProps<unknown>,
  {}
> {
  constructor(props: TileWrapperProps<unknown>) {
    super(props)
  }
  //   shouldComponentUpdate(nextProps: TileWrapperProps<unknown>, nextState: {}) {
  //     const tabsMoving =
  //       (nextProps.tilePaneProps.pane.rect != null) !==
  //       (this.props.tilePaneProps.pane.rect != null)
  //     return tabsMoving || nextProps.tilePaneProps.pane.rect != null
  //   }
  shouldComponentUpdate(nextProps: TileWrapperProps<unknown>, nextState: {}) {
    return true
  }

  render = () => {
    return React.isValidElement(this.props.content) ? (
      this.props.content
    ) : this.props.content != null ? (
      React.createElement(this.props.content as any, {
        context: this.props.tilePaneProps.context,
      })
    ) : (
      <></>
    )
  }
}
