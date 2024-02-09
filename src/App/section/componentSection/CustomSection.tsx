import { TileBranchSubstance, TileContainer, useGetRootNode } from 'components'
import React from 'react'
import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { SectionContext } from 'App/sectionConfiguration/SectionContext'

import { TilePaneProviderProps } from 'components/tilePane/view/Provider/config/PaneProvider'
import { named } from 'App/sectionConfiguration/named'
import { tabBarBuilder } from 'App/component/tabBar/basic/TabBarConfig'
import { StretchBar } from 'App/component/tabBar/basic/StretchBarConfig'
import { ScopedTileProvider } from 'App/context/ScopedTileProvider'
import { PaneProvider } from 'App/component/provider/paneProvider'

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

  rootPane: TileBranchSubstance = {
    characteristic: {
      movable: {
        center: false,
        left: false,
        right: false,
        top: false,
        bottom: false,
      },
    },
    children: [
      {
        characteristic: {
          movable: {
            center: false,
            left: false,
            right: false,
            top: false,
            bottom: false,
          },
        },
        children: [makeBearerString('aaa')],
      },
      {
        onTab: 2,
        children: [
          makeBearerString('aaa'),
          makeBearerString('bbb'),
          makeBearerString('custom'),
        ],
      },
    ],
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
      : this.rootPane

    return (
      <ScopedTileProvider
        paneName={this.props.pane.name}
        rootNode={this.rootPane}
        tabBar={tabBarBuilder({ named, isDraggable: true })}
        stretchBar={StretchBar}
        tilePaneProvider={{ paneProvider: this.middleManProvider }}
      >
        <TileContainer />
        <AutoSaveLayout />
        <div />
      </ScopedTileProvider>
    )
  }
}
function AutoSaveLayout() {
  const getRootNode = useGetRootNode()
  localStorage.setItem('SomeOtherKeyxxx', JSON.stringify(getRootNode()))
  return <></>
}
