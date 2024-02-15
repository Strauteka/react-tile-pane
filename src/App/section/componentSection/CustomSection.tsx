import { TileContainer, TileLeaf } from 'components'
import React from 'react'
import { unfoldBearer } from 'App/sectionConfiguration/Bearer'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'
import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { ScopedTileProvider } from 'App/context/ScopedTileProvider'
import { PaneProvider } from 'App/component/provider/paneProvider'
import { mainSectionConfiguration } from 'App/sectionConfiguration/MainSectionConfiguration'
import { sectionKeys } from 'App/sectionConfiguration/SectionName'
import { rootPane } from './customSectionLayout'
import { color } from 'App/component/tabBar/basic/styles'
import { SaveLayout, getLayout } from 'App/sectionConfiguration/LayoutSave'

type CustomSectionState = {}
type CustomSectionProps = {}

export class CustomSection extends React.Component<
  SectionContext<CustomSectionProps>,
  CustomSectionState
> {
  constructor(props: SectionContext<CustomSectionProps>) {
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
      <ScopedTileProvider
        rootNode={getLayout(this.props.pane.name, rootPane)}
        paneName={this.props.pane.name}
        tabBar={tabBarBuilder(
          {
            sectionConfiguration: mainSectionConfiguration,
            isDraggable: false,
          },
          {
            thicknessOverride: (leaf?: TileLeaf) => {
              if (leaf) {
                const bearer = unfoldBearer(leaf.children[leaf.onTab])
                if (bearer.paneName === sectionKeys.grape) {
                  return 0
                }
              }
            },
          }
        )}
        stretchBar={StretchBar}
        tilePaneProvider={{ paneProvider: this.middleManProvider }}
      >
        <div
          style={{
            height: '1.2em',
            backgroundColor: color.backL,
            color: color.primary,
            overflow: 'hidden',
          }}
        >
          Some Custom Stuff on Section Composition
        </div>
        <TileContainer style={{ height: 'calc(100% - 1.2em)' }} />
        <SaveLayout pane={this.props.pane.name}  saveLayout={false} />
      </ScopedTileProvider>
    )
  }
}
