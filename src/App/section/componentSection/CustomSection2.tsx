import { TileContainer, TileProvider } from 'components'
import React from 'react'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { PaneProvider } from 'App/component/provider/paneProvider'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { mainSectionConfiguration } from 'App/sectionConfiguration/MainSectionConfiguration'
import { rootPane } from './customSection2Layout'
import { SaveLayout, getLayout } from 'App/sectionConfiguration/LayoutSave'
type CustomSection2State = {}
type CustomSection2Props = {}

export class CustomSection2 extends React.Component<
  SectionContext<CustomSection2Props>,
  CustomSection2State
> {
  constructor(props: SectionContext<CustomSection2Props>) {
    super(props)
    console.log(this.constructor.name, 'INIT')
  }

  middleManProvider: React.FC<TilePaneProviderProps> = (
    props: TilePaneProviderProps
  ) => {
    return (
      <PaneProvider
        {...props}
        styled={{
          ...props.styled,
        }}
      />
    )
  }

  render = () => {
    return (
      <TileProvider
        rootNode={getLayout(this.props.pane.name, rootPane)}
        tabBar={tabBarBuilder(
          {
            sectionConfiguration: mainSectionConfiguration,
            isDraggable: false,
          },
          { thickness: 0 }
        )}
        stretchBar={StretchBar}
        tilePaneProvider={{ paneProvider: this.middleManProvider }}
      >
        <TileContainer />
        <SaveLayout pane={this.props.pane.name} saveLayout={false} />
        <div />
      </TileProvider>
    )
  }
}
