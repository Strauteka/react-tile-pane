import {
  TileBranchSubstance,
  TileContainer,
  TileLeaf,
  useGetRootNode,
} from 'components'
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

type CustomSectionState = {}
type CustomSectionProps = {}

export class CustomSection extends React.Component<
  SectionContext<CustomSectionProps>,
  CustomSectionState
> {
  constructor(props: SectionContext<CustomSectionProps>) {
    super(props)
    console.log('constructor123124124')
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

  shouldComponentUpdate(
    nextProps: Readonly<SectionContext<CustomSectionProps>>,
    nextState: Readonly<CustomSectionState>,
    nextContext: any
  ): boolean {
    console.log('shouldComponentUpdate', this.constructor.name)
    return true
  }

  render = () => {
    const localRoot = localStorage.getItem('SomeOtherKeyxxx')
    const root = localRoot
      ? (JSON.parse(localRoot) as TileBranchSubstance)
      : rootPane()
    console.log('render!', root)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 500)
    return (
      <ScopedTileProvider
        paneName={this.props.pane.name}
        rootNode={root}
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
          }}
        >
          Some Custom Stuff on Section Composition
        </div>
        <TileContainer style={{ height: 'calc(100% - 1.2em)' }} />
        <AutoSaveLayout />
      </ScopedTileProvider>
    )
  }
}
function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  console.log()
  localStorage.setItem('SomeOtherKeyxxx', JSON.stringify(getRootNode()))
  return <></>
}
