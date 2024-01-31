import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { section as sections } from './Section'
import { unfoldBearer } from './Bearer'
import React, { useContext } from 'react'
import { AppSelectionContext } from 'App/context/AppSelectionContext'
import { SectionConfiguration, named } from './named'
import { Constr, SectionContext } from './SectionContext'
import { TilePaneWithRect } from 'components'
import { AppStateContext } from 'App/context/AppStateContext'

export const PaneProvider: React.FC<TilePaneProviderProps> = (
  props: TilePaneProviderProps
) => {
  const bearer = unfoldBearer(props.pane.name)
  const sectionConfig: SectionConfiguration = {
    ...{ isSelection: true, isParentPropsPersistent: false },
    ...named[bearer.paneName],
  }
  const { selection, setSelection } = useContext(AppSelectionContext)
  const { appState, setAppState } = useContext(AppStateContext)
  const parentData = appState[selection]

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
      {...(sectionConfig.isSelection && selection !== props.pane.name
        ? {
            onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              console.log('clicked', bearer.paneName, props.pane.name)
              setSelection(props.pane.name)
            },
          }
        : {})}
    >
      <TileWrapper
        sectionConfiguration={sectionConfig}
        sectionContext={{
          paneName: props.pane.name,
          bearer: bearer,
          parent: parentData,
        }}
        pane={props.pane}
        content={content}
      ></TileWrapper>
    </div>
  )
}

export interface TileWrapperProps<T> {
  sectionConfiguration: SectionConfiguration
  sectionContext: SectionContext<T>
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
  shouldComponentUpdate(nextProps: TileWrapperProps<unknown>, nextState: {}) {
    if (
      !nextProps.sectionConfiguration.isParentPropsPersistent &&
      nextProps.sectionContext.parent == null
    ) {
      nextProps.sectionContext.parent = this.props.sectionContext.parent
    }
    const tabsMoving =
      (nextProps.pane.rect != null) !== (this.props.pane.rect != null)
    return tabsMoving || nextProps.pane.rect != null
  }

  render = () => {
    return React.isValidElement(this.props.content) ? (
      this.props.content
    ) : this.props.content != null ? (
      React.createElement(this.props.content as any, this.props.sectionContext)
    ) : (
      <></>
    )
  }
}
